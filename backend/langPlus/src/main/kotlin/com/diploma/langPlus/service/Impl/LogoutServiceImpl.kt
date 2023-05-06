package com.diploma.langPlus.service.Impl

import com.diploma.langPlus.repository.TokenRepository
import com.diploma.langPlus.security.BEARER
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.http.HttpHeaders
import org.springframework.security.core.Authentication
import org.springframework.security.web.authentication.logout.LogoutHandler
import org.springframework.stereotype.Service

@Service
class LogoutServiceImpl(
    val tokenRepository: TokenRepository
): LogoutHandler {
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
    }
}