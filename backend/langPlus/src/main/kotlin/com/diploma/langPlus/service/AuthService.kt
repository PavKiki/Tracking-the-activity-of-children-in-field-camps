package com.diploma.langPlus.service

import com.diploma.langPlus.entity.UserEntity
import jakarta.servlet.http.HttpServletResponse

interface AuthService {
    fun checkEmail(email: String)
    fun checkUsername(username: String)
    fun findByEmailOrUsername(login: String): UserEntity
    fun checkPasswords(password: String, encryptedPassword: String)
    fun setJwt(issuer: String, response: HttpServletResponse)
}