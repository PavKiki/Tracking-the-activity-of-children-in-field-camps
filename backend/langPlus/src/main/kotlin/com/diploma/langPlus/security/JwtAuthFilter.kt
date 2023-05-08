package com.diploma.langPlus.security

import com.diploma.langPlus.entity.UserEntity
import com.diploma.langPlus.repository.TokenRepository
import com.diploma.langPlus.service.AuthService
import com.diploma.langPlus.service.CustomUserDetailsService
import com.diploma.langPlus.service.JwtService
import io.jsonwebtoken.ExpiredJwtException
import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpHeaders
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter

const val BEARER = "Bearer "

@Component
class JwtAuthFilter(
    val jwtService: JwtService,
    val userDetailsService: CustomUserDetailsService,
): OncePerRequestFilter() {
    @Value("\${app.security.jwt.access-token.path}")
    private lateinit var accessPath: String
    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain,
    ) {
        if (request.cookies?.size == null) {
            filterChain.doFilter(request, response)
            return
        }

        val jwtAccessCookie = request.cookies
            .find { it.name == "jwt-access"}

        val jwt: String
        if (jwtAccessCookie == null) {
            filterChain.doFilter(request, response)
            return
        }
        else {
            jwt = jwtAccessCookie.value
        }

        val username: String
        try {
            username = jwtService.extractUsername(jwt)
        }
        catch (e: ExpiredJwtException) {
            filterChain.doFilter(request, response)
            return
        }

        if (SecurityContextHolder.getContext().authentication == null) {
            val userDetails = userDetailsService.loadUserByUsername(username)
            if (jwtService.isAccessTokenValid(jwt, userDetails as UserEntity)) {
                val authToken = UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.authorities
                )
                authToken.details = WebAuthenticationDetailsSource().buildDetails(request)
                SecurityContextHolder.getContext().authentication = authToken
            }
        }
        filterChain.doFilter(request, response)
    }
}