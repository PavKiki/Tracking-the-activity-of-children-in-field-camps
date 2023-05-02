package com.diploma.langPlus.controller

import com.diploma.langPlus.dto.LoginDto
import com.diploma.langPlus.dto.RegisterDto
import com.diploma.langPlus.entity.UserEntity
import com.diploma.langPlus.entity.toUserDto
import com.diploma.langPlus.exception.EmailAlreadyRegistered
import com.diploma.langPlus.exception.IncorrectPassword
import com.diploma.langPlus.exception.UserDoesntExist
import com.diploma.langPlus.exception.UsernameAlreadyRegistered
import com.diploma.langPlus.service.AuthService
import com.diploma.langPlus.service.UserService
import jakarta.servlet.http.HttpServletResponse
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1")
class AuthController(val authService: AuthService, val userService: UserService) {
    @PostMapping("register")
    fun registerUser(@RequestBody body: RegisterDto): ResponseEntity<Any> {
        try {
            authService.checkEmail(body.email)
            authService.checkUsername(body.username)
        }
        catch (e: EmailAlreadyRegistered) {
            return ResponseEntity.badRequest().body(e.message)
        }
        catch (e: UsernameAlreadyRegistered) {
            return ResponseEntity.badRequest().body(e.message)
        }
        catch (e: Exception) {
            return ResponseEntity.badRequest().body(e.message)
        }
        return ResponseEntity.ok(userService.addUser(body).toUserDto())
    }

    @PostMapping("login")
    fun loginUser(@RequestBody loginDto: LoginDto, response: HttpServletResponse): ResponseEntity<Any> {
        val user: UserEntity
        try {
            user = authService.findByEmailOrUsername(loginDto.login)
            authService.checkPasswords(loginDto.password, user.password)
        }
        catch (e: UserDoesntExist) {
            return ResponseEntity.badRequest().body(e.message)
        }
        catch (e: IncorrectPassword) {
            return ResponseEntity.badRequest().body(e.message)
        }
        catch (e: Exception) {
            return ResponseEntity.badRequest().body(e.message)
        }
        authService.setJwt(user.id.toString(), response)
        return ResponseEntity.ok("Success!")
    }
}