package com.diploma.langPlus.service.Impl

import com.diploma.langPlus.dto.AuthResponseDto
import com.diploma.langPlus.dto.RegisterDto
import com.diploma.langPlus.entity.TokenEntity
import com.diploma.langPlus.entity.UserEntity
import com.diploma.langPlus.exception.EmailAlreadyRegistered
import com.diploma.langPlus.exception.UserDoesntExist
import com.diploma.langPlus.exception.UsernameAlreadyRegistered
import com.diploma.langPlus.repository.TokenRepository
import com.diploma.langPlus.repository.UserRepository
import com.diploma.langPlus.security.BEARER
import com.diploma.langPlus.security.Role
import com.diploma.langPlus.security.TokenType
import com.diploma.langPlus.service.AuthService
import com.diploma.langPlus.service.JwtService
import jakarta.servlet.http.Cookie
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.http.HttpHeaders
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class AuthServiceImpl(
    val userRepository: UserRepository,
    val passwordEncoder: PasswordEncoder,
    val jwtService: JwtService,
    val authenticationManager: AuthenticationManager,
    val tokenRepository: TokenRepository
): AuthService {
    override fun checkEmail(email: String) {
        if (userRepository.findByEmail(email) != null) throw EmailAlreadyRegistered("User with email $email is already registered!")
    }
    override fun checkUsername(username: String) {
        if (userRepository.findByUsername(username) != null) throw UsernameAlreadyRegistered("User with username $username is already registered!")
    }

    override fun findByEmailOrUsername(login: String): UserEntity {
        val user: UserEntity? = userRepository.findByEmail(login)
            ?: userRepository.findByUsername(login)
        return user
            ?: throw UserDoesntExist("User with email/username $login doesn't exist!")
    }

    override fun addUser(registerDto: RegisterDto): UserEntity {
        val newUser = UserEntity(
            0,
            registerDto.name,
            registerDto.surname,
            registerDto.username,
            registerDto.email,
            Role.ADMIN,
            mutableListOf()
        )
        newUser.setPassword(passwordEncoder.encode(registerDto.password))
        return userRepository.save(newUser)
    }

    override fun authenticateUser(username: String, password: String) {
        authenticationManager.authenticate(
            UsernamePasswordAuthenticationToken(
                username,
                password
            )
        )
    }

    override fun createTokens(user: UserEntity, response: HttpServletResponse) {
        revokeAllValidTokens(user)
        refreshCookies(response, user)
    }

    override fun refreshAccessToken(refreshToken: String?, response: HttpServletResponse) {
        if (refreshToken == null) throw Exception("Refresh token is missing!")

        val username = jwtService.extractUsername(refreshToken)
        val userDetails = userRepository.findByUsername(username)
            ?: throw UserDoesntExist("User with username $username doesn't exist!")

        if (!jwtService.isRefreshTokenValid(refreshToken, userDetails)) throw Exception("Token is invalid!")

        revokeAllValidAccessTokens(userDetails)
        refreshCookies(response, userDetails, refreshToken)
    }

    override fun refreshCookies(response: HttpServletResponse, user: UserEntity, refreshToken: String?) {
        val jwtAccessToken = jwtService.generateAccessToken(user, mapOf())
        val accessToken = TokenEntity(0, jwtAccessToken, TokenType.BEARER_ACCESS, false, false, user)
        user.tokens.add(accessToken)
        tokenRepository.save(accessToken)
        val cookieAccess = Cookie("jwt-access", jwtAccessToken)
        cookieAccess.isHttpOnly = true
        cookieAccess.path = "/api/v1"
        response.addCookie(cookieAccess)

        if (refreshToken == null) {
            val jwtRefreshToken = jwtService.generateRefreshToken(user)
            val refreshToken = TokenEntity(0, jwtRefreshToken, TokenType.BEARER_REFRESH, false, false, user)
            user.tokens.add(refreshToken)
            tokenRepository.save(refreshToken)
            val cookieRefresh = Cookie("jwt-refresh", jwtRefreshToken)
            cookieRefresh.isHttpOnly = true
            cookieRefresh.path = "/api/v1/auth/refresh-token"
            response.addCookie(cookieRefresh)
        }
    }

    override fun revokeAllValidAccessTokens(user: UserEntity) {
        val validTokens = tokenRepository
            .findAllValidAccessTokensByUserId(user.id)
        validTokens.forEach {
            it.revoked = true
            it.expired = true
        }
        tokenRepository.saveAll(validTokens)
    }
    override fun revokeAllValidTokens(user: UserEntity) {
        val validTokens = tokenRepository
            .findAllValidTokensByUserId(user.id)
        validTokens.forEach {
            it.revoked = true
            it.expired = true
        }
        tokenRepository.saveAll(validTokens)
    }
}