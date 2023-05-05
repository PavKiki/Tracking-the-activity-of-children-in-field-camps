package com.diploma.langPlus.service.Impl

import com.diploma.langPlus.entity.UserEntity
import com.diploma.langPlus.service.JwtService
import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.io.Decoders
import io.jsonwebtoken.security.Keys
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Service
import java.security.Key
import java.util.Date
import java.util.function.Function

const val SECRET_KEY = "6A576E5A7134743777217A25432A462D4A614E645267556B5870327335753878"

@Service
class JwtServiceImpl: JwtService {
    override fun extractUsername(token: String): String = extractClaim(token, Claims::getSubject)

    override fun extractAllClaims(token: String): Claims {
        return Jwts
            .parserBuilder()
            .setSigningKey(getSignInKey())
            .build()
            .parseClaimsJws(token)
            .getBody()
    }

    override fun <T> extractClaim(token: String, claimsResolver: (Claims) -> T): T {
        val claims = extractAllClaims(token)
        return claimsResolver(claims)
    }

    override fun generateToken(userDetails: UserEntity, extraClaims: Map<String, Any?>): String {
        return Jwts
            .builder()
            .setClaims(extraClaims)
            .setSubject(userDetails.username)
            .setIssuedAt(Date(System.currentTimeMillis()))
            .setExpiration(Date(System.currentTimeMillis() + 1000 * 60 * 30)) //30 minutes
            .signWith(getSignInKey(), SignatureAlgorithm.HS256)
            .compact()
    }

    override fun isTokenValid(token: String, userDetails: UserEntity): Boolean {
        return userDetails.username == extractUsername(token) && !isTokenExpired(token)
    }

    override fun isTokenExpired(token: String): Boolean = extractExpiration(token).before(Date())

    override fun extractExpiration(token: String): Date = extractClaim(token, Claims::getExpiration)


    private fun getSignInKey(): Key {
        val keyBytes = Decoders.BASE64.decode(SECRET_KEY)
        return Keys.hmacShaKeyFor(keyBytes)
    }
}