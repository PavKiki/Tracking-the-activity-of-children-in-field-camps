package com.diploma.langPlus.controller

import com.diploma.langPlus.dto.LoginDto
import com.diploma.langPlus.dto.AuthResponseDto
import com.diploma.langPlus.dto.RegisterDto
import com.diploma.langPlus.entity.UserEntity
import com.diploma.langPlus.entity.toUserDto
import com.diploma.langPlus.exception.EmailAlreadyRegistered
import com.diploma.langPlus.exception.IncorrectPassword
import com.diploma.langPlus.exception.UserDoesntExist
import com.diploma.langPlus.exception.UsernameAlreadyRegistered
import com.diploma.langPlus.service.AuthService
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.apache.coyote.Response
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin(
    allowCredentials = "true",
    origins = ["http://localhost:3000", "http://localhost:8080"]
)
@RequestMapping("/api/v1/auth")
class AuthController(
    val authService: AuthService,
) {
    @PostMapping("register")
    fun registerUser(@RequestBody body: RegisterDto): ResponseEntity<Any> {
        try {
            authService.checkEmail(body.email)
            authService.checkUsername(body.username)
            authService.addUser(body)
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
        return ResponseEntity.ok("Successfully registered!")
    }

    @PostMapping("login")
    fun loginUser(
        @RequestBody loginDto: LoginDto,
        response: HttpServletResponse
    ): ResponseEntity<Any> {
        val user: UserEntity
        try {
            user = authService.findByEmailOrUsername(loginDto.login)
            authService.authenticateUser(user.username, loginDto.password)
            authService.createTokens(user, response)
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
        return ResponseEntity.ok(user.toUserDto())
    }

    @PostMapping("refresh-token")
    fun refreshToken(
        @CookieValue("jwt-refresh") refreshToken: String?,
        response: HttpServletResponse
    ): ResponseEntity<Any>
    {
        try {
            authService.refreshAccessToken(refreshToken, response)
        }
        catch(e: UserDoesntExist) {
            return ResponseEntity.badRequest().body(e.message)
        }
        catch (e: Exception) {
            return ResponseEntity.badRequest().body(e.message)
        }
        return ResponseEntity.ok("Success")
    }
}