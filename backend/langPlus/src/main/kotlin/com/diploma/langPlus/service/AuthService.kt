package com.diploma.langPlus.service

import com.diploma.langPlus.dto.AuthResponseDto
import com.diploma.langPlus.dto.RegisterDto
import com.diploma.langPlus.entity.UserEntity
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse

interface AuthService {
    fun checkEmail(email: String)
    fun checkUsername(username: String)
    fun findByEmailOrUsername(login: String): UserEntity
    fun addUser(registerDto: RegisterDto): UserEntity
    fun authenticateUser(username: String, password: String)
    fun createTokens(user: UserEntity): AuthResponseDto
    fun refreshToken(request: HttpServletRequest): AuthResponseDto
    fun revokeAllValidTokens(user: UserEntity)
}