package com.diploma.langPlus.repository

import com.diploma.langPlus.entity.TokenEntity
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.query.Param

interface TokenRepository: CrudRepository<TokenEntity, Long> {
    fun findByToken(token: String): TokenEntity?

    @Query("""
        select t from TokenEntity t inner join UserEntity u on t.user.id = u.id
        where u.id = :userId and (t.expired = false or t.revoked = false)
    """)
    fun findAllValidTokensByUserId(@Param("userId") userId: Long): List<TokenEntity>
}