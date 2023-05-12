package com.diploma.langPlus.repository

import com.diploma.langPlus.entity.TokenEntity
import com.diploma.langPlus.enums.TokenType
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.query.Param

interface TokenRepository: CrudRepository<TokenEntity, Long> {
    fun findByToken(token: String): TokenEntity?

    @Query("""
        select t from TokenEntity t inner join UserEntity u on t.user.id = u.id
        where u.id = :userId and (t.expired = false or t.revoked = false) and t.tokenType = :accessToken
    """)
    fun findAllValidAccessTokensByUserId(
        @Param("userId") userId: Long,
        @Param("accessToken") accessToken: TokenType
    ): List<TokenEntity>

    @Query("""
        select t from TokenEntity t inner join UserEntity u on t.user.id = u.id
        where u.id = :userId and (t.expired = false or t.revoked = false)
    """)
    fun findAllValidTokensByUserId(@Param("userId") userId: Long): List<TokenEntity>
}