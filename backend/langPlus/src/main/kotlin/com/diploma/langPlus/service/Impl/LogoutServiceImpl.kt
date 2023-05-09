package com.diploma.langPlus.service.Impl

import com.diploma.langPlus.repository.TokenRepository
import jakarta.servlet.http.Cookie
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.core.Authentication
import org.springframework.security.web.authentication.logout.LogoutHandler
import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.CrossOrigin

@Service
class LogoutServiceImpl(
    val tokenRepository: TokenRepository
): LogoutHandler {
    @Value("\${app.security.jwt.access-token.path}")
    private lateinit var accessPath: String
    @Value("\${app.security.jwt.refresh-token.path}")
    private lateinit var refreshPath: String
    override fun logout(
        request: HttpServletRequest?,
        response: HttpServletResponse?,
        authentication: Authentication?
    ) {
        if (request?.cookies == null) return

        val jwtCookies = request
            .cookies
            .filter { cookie -> cookie.name == "jwt-access" || cookie.name == "jwt-refresh" }
        val storedJwt = jwtCookies
            .map { cookie -> tokenRepository.findByToken(cookie.value) }
        for (storedToken in storedJwt) {
            if (storedToken != null) {
                storedToken.expired = true
                storedToken.revoked = true
                tokenRepository.save(storedToken)
            }
        }

        val jwtAccess = Cookie("jwt-access", "")
        jwtAccess.path = accessPath
        jwtAccess.maxAge = 0
        val jwtRefresh = Cookie("jwt-refresh", "")
        jwtRefresh.path = refreshPath
        jwtRefresh.maxAge = 0
        response?.addCookie(jwtAccess)
        response?.addCookie(jwtRefresh)
    }
}