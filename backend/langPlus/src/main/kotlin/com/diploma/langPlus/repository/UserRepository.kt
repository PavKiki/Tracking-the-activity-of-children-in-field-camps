package com.diploma.langPlus.repository

import com.diploma.langPlus.entity.UserEntity
import org.springframework.data.repository.CrudRepository

interface UserRepository: CrudRepository<UserEntity, Int> {
    fun findByEmail(email: String): UserEntity?
    fun findByUsername(username: String): UserEntity?
}