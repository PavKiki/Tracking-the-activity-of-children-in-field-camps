package com.diploma.langPlus.service

import com.diploma.langPlus.entity.UserEntity
import io.jsonwebtoken.Claims
import org.springframework.security.core.userdetails.UserDetails
import java.util.Date

interface JwtService {
    fun extractUsername(token: String): String
    fun extractAllClaims(token: String): Claims
    fun <T> extractClaim(token: String, claimsResolver: (Claims) -> T): T
    fun generateToken(userDetails: UserEntity, extraClaims: Map<String, Any?>): String
    fun isTokenValid(token: String, userDetails: UserEntity): Boolean
    fun isTokenExpired(token: String): Boolean
    fun extractExpiration(token: String): Date
}