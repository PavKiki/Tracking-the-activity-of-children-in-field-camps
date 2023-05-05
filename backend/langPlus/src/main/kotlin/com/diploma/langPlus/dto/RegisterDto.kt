package com.diploma.langPlus.dto

import com.diploma.langPlus.entity.UserEntity
import com.diploma.langPlus.security.Role

class RegisterDto(
    val name: String,
    val surname: String,
    val username: String,
    val email: String,
    val password: String
)
