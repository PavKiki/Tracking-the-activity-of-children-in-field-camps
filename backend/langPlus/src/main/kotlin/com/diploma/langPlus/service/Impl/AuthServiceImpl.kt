package com.diploma.langPlus.service.Impl

import com.diploma.langPlus.entity.UserEntity
import com.diploma.langPlus.exception.EmailAlreadyRegistered
import com.diploma.langPlus.exception.IncorrectPassword
import com.diploma.langPlus.exception.UserDoesntExist
import com.diploma.langPlus.exception.UsernameAlreadyRegistered
import com.diploma.langPlus.repository.UserRepository
import com.diploma.langPlus.service.AuthService
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.impl.TextCodec
import jakarta.servlet.http.Cookie
import jakarta.servlet.http.HttpServletResponse
import org.springframework.http.ResponseEntity
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service
import java.util.*

@Service
class AuthServiceImpl(val userRepository: UserRepository): AuthService {
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

    override fun checkPasswords(password: String, encryptedPassword: String) {
        if (!BCryptPasswordEncoder().matches(password, encryptedPassword)) throw IncorrectPassword("Incorrect password!")
    }

    override fun setJwt(issuer: String, response: HttpServletResponse) {
        val jwt = Jwts.builder()
            .setIssuer(issuer)
            .setExpiration(Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) //1 day
            .signWith(
                SignatureAlgorithm.HS256,
                TextCodec.BASE64.decode("Yn2kjibddFAWtnPJ2AFlL8WXmohJMCvigQggaEypa5E=")
            )
            .compact()
        val cookie = Cookie("jwt", jwt)
            .also { it.isHttpOnly = true }
        response.addCookie(cookie)
    }
}