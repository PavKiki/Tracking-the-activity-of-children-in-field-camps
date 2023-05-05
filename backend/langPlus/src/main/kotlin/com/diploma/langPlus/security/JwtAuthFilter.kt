package com.diploma.langPlus.security

import com.diploma.langPlus.entity.UserEntity
import com.diploma.langPlus.repository.TokenRepository
import com.diploma.langPlus.service.AuthService
import com.diploma.langPlus.service.CustomUserDetailsService
import com.diploma.langPlus.service.JwtService
import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter

const val AUTHORIZATION = "Authorization"
const val BEARER = "Bearer "

@Component
class JwtAuthFilter(
    val jwtService: JwtService,
    val userDetailsService: CustomUserDetailsService,
    val tokenRepository: TokenRepository
): OncePerRequestFilter() {
    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain,
    ) {
        val authHeader = request.getHeader(AUTHORIZATION)
        if (authHeader == null || !authHeader.startsWith(BEARER)) {
            filterChain.doFilter(request, response)
            return
        }
        val jwt = authHeader.substring(BEARER.length)
        val username = jwtService.extractUsername(jwt)
        if (SecurityContextHolder.getContext().authentication == null) {
            val userDetails = userDetailsService.loadUserByUsername(username)
            val isTokenValid: Boolean = run {
                val token = tokenRepository.findByToken(jwt)
                return@run !(token == null || token.expired || token.revoked)
            }
            if (jwtService.isTokenValid(jwt, userDetails as UserEntity) && isTokenValid) {
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