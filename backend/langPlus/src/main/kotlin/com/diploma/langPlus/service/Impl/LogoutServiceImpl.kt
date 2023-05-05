package com.diploma.langPlus.service.Impl

import com.diploma.langPlus.repository.TokenRepository
import com.diploma.langPlus.security.AUTHORIZATION
import com.diploma.langPlus.security.BEARER
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
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
        val authHeader = request?.getHeader(AUTHORIZATION)
        if (authHeader == null || !authHeader.startsWith(BEARER)) {
            return
        }
        val jwt = authHeader.substring(BEARER.length)
        val storedToken = tokenRepository.findByToken(jwt)
        if (storedToken != null) {
            storedToken.expired = true
            storedToken.revoked = true
            tokenRepository.save(storedToken)
        }
    }
}