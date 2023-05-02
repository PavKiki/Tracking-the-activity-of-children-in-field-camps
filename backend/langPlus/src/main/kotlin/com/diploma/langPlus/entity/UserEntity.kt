package com.diploma.langPlus.entity

import com.diploma.langPlus.dto.LoginDto
import com.diploma.langPlus.dto.UserDto
import jakarta.persistence.*
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder

@Entity
@Table(name="end_user")
class UserEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int,
    val name: String,
    val surname: String,
    val username: String,
    val email: String
) {
    var password: String = ""
        set(value: String) {
            val passwordEncoder = BCryptPasswordEncoder()
            field = passwordEncoder.encode(value)
        }
}

fun UserEntity.toUserDto(): UserDto = UserDto(name, surname, username, email)