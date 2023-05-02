package com.diploma.langPlus.dto

import com.diploma.langPlus.entity.UserEntity

data class RegisterDto(
    val name: String,
    val surname: String,
    val username: String,
    val email: String,
    val password: String
)

fun RegisterDto.toEntity(): UserEntity {
    val newUser = UserEntity(0, name, surname, username, email)
    newUser.password = password
    return newUser
}
