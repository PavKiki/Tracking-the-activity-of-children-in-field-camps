package com.diploma.langPlus.entity

import com.diploma.langPlus.security.TokenType
import jakarta.persistence.*

@Entity
@Table(name = "token")
class TokenEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,
    val token: String,
    @Enumerated(EnumType.STRING)
    val tokenType: TokenType,
    var expired: Boolean,
    var revoked: Boolean,
    @ManyToOne
    @JoinColumn(name = "userId")
    val user: UserEntity
)