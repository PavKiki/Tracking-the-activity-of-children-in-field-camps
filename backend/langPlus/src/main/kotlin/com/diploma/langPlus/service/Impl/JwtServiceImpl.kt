package com.diploma.langPlus.service.Impl

import com.diploma.langPlus.entity.UserEntity
import com.diploma.langPlus.repository.TokenRepository
import com.diploma.langPlus.security.TokenType
import com.diploma.langPlus.service.JwtService
import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.io.Decoders
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.security.Key
import java.util.Date

const val accessTokenExpiration: Long = 1800000 //30 minutes
const val refreshTokenExpiration: Long = 604800000 //7 days
//const val accessTokenExpiration: Long = 10000 //10 seconds
//const val refreshTokenExpiration: Long = 30000 //30 seconds
const val TYPE = "type"
@Service
class JwtServiceImpl(
    val tokenRepository: TokenRepository
): JwtService {
    @Value("\${app.security.jwt.secret-key}")
    private lateinit var secretKey: String
    override fun extractUsername(token: String): String = extractClaim(token, Claims::getSubject)

    override fun extractType(token: String): String {
        return extractClaim(token) { claims -> claims[TYPE] as String }
    }

    override fun extractAllClaims(token: String): Claims {
        return Jwts
            .parserBuilder()
            .setSigningKey(getSignInKey())
            .build()
            .parseClaimsJws(token)
            .body
    }

    override fun <T> extractClaim(token: String, claimsResolver: (Claims) -> T): T {
        val claims = extractAllClaims(token)
        return claimsResolver(claims)
    }

    override fun buildToken(userDetails: UserEntity, extraClaims: Map<String, Any>, expiration: Long): String {
        return Jwts
            .builder()
            .setClaims(extraClaims)
            .setSubject(userDetails.username)
            .setIssuedAt(Date(System.currentTimeMillis()))
            .setExpiration(Date(System.currentTimeMillis() + expiration))
            .signWith(getSignInKey(), SignatureAlgorithm.HS256)
            .compact()
    }

    override fun generateAccessToken(userDetails: UserEntity, extraClaims: Map<String, Any>): String {
        return buildToken(userDetails, mapOf(TYPE to TokenType.BEARER_ACCESS) + extraClaims, accessTokenExpiration)
    }

    override fun generateRefreshToken(userDetails: UserEntity): String {
        return buildToken(userDetails, mapOf(TYPE to TokenType.BEARER_REFRESH), refreshTokenExpiration)
    }
    override fun isTokenValid(token: String, userDetails: UserEntity): Boolean {
        val isTokenValid: Boolean = run {
            val curToken = tokenRepository.findByToken(token)
            return@run !(curToken == null || curToken.expired || curToken.revoked)
        }
        return userDetails.username == extractUsername(token) && isTokenValid
    }

    override fun isAccessTokenValid(token: String, userDetails: UserEntity): Boolean {
        return isTokenValid(token, userDetails) && extractType(token) == TokenType.BEARER_ACCESS.name
    }

    override fun isRefreshTokenValid(token: String, userDetails: UserEntity): Boolean {
        return isTokenValid(token, userDetails) && extractType(token) == TokenType.BEARER_REFRESH.name
    }

    override fun isTokenExpired(token: String): Boolean = extractExpiration(token).before(Date())

    override fun extractExpiration(token: String): Date = extractClaim(token, Claims::getExpiration)


    private fun getSignInKey(): Key {
        val keyBytes = Decoders.BASE64.decode(secretKey)
        return Keys.hmacShaKeyFor(keyBytes)
    }
}