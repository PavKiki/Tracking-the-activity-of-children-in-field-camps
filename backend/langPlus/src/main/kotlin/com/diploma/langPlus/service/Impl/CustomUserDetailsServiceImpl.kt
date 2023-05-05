package com.diploma.langPlus.service.Impl

import com.diploma.langPlus.entity.UserEntity
import com.diploma.langPlus.exception.UserDoesntExist
import com.diploma.langPlus.repository.UserRepository
import com.diploma.langPlus.service.CustomUserDetailsService
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Service

@Service
class CustomUserDetailsServiceImpl(
    val userRepository: UserRepository
): CustomUserDetailsService {
        override fun loadUserByUsername(username: String?): UserDetails {
        if (username == null) throw UserDoesntExist("Incorrect input!")
        return userRepository.findByUsername(username)
            ?: throw UserDoesntExist("User with username $username doesn't exist!")
    }
}