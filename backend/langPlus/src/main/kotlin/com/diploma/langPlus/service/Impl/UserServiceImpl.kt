package com.diploma.langPlus.service.Impl

import com.diploma.langPlus.dto.RegisterDto
import com.diploma.langPlus.dto.toEntity
import com.diploma.langPlus.entity.UserEntity
import com.diploma.langPlus.repository.UserRepository
import com.diploma.langPlus.service.UserService
import org.springframework.stereotype.Service

@Service
class UserServiceImpl(val userRepository: UserRepository): UserService {
//    override fun addUser(registerDto: RegisterDto): UserEntity = userRepository.save(registerDto.toEntity())
}