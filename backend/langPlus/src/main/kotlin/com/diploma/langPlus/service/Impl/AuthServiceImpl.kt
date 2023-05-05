package com.diploma.langPlus.service.Impl

import com.diploma.langPlus.dto.LoginDto
import com.diploma.langPlus.dto.RegisterDto
import com.diploma.langPlus.entity.UserEntity
import com.diploma.langPlus.exception.EmailAlreadyRegistered
import com.diploma.langPlus.exception.IncorrectPassword
import com.diploma.langPlus.exception.UserDoesntExist
import com.diploma.langPlus.exception.UsernameAlreadyRegistered
import com.diploma.langPlus.repository.UserRepository
import com.diploma.langPlus.security.Role
import com.diploma.langPlus.service.AuthService
import com.diploma.langPlus.service.JwtService
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.impl.TextCodec
import jakarta.servlet.http.Cookie
import jakarta.servlet.http.HttpServletResponse
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import java.util.*

@Service
class AuthServiceImpl(
    val userRepository: UserRepository,
    val passwordEncoder: PasswordEncoder,
    val jwtService: JwtService,
    val authenticationManager: AuthenticationManager
): AuthService {
    //if true => user with this email/username already exists
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
            Role.ADMIN
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

    override fun createAccessToken(user: UserEntity) = jwtService.generateToken(user, mapOf())
}