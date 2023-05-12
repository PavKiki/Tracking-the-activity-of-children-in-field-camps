package com.diploma.langPlus.entity

import com.diploma.langPlus.dto.UserDto
import com.diploma.langPlus.enums.Role
import jakarta.persistence.*
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

@Entity
@Table(name="end_user")
class UserEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,
    val name: String,
    val surname: String,
    private val username: String,
    val email: String,
    @Enumerated(EnumType.STRING)
    val role: Role,
    @OneToMany(mappedBy = "user")
    val tokens: MutableList<TokenEntity>
): UserDetails {
    private var password: String = ""

    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        return mutableListOf(SimpleGrantedAuthority(role.name))
    }

    override fun getPassword(): String {
        return password
    }

    fun setPassword(password: String) {
        this.password = password
    }

    override fun getUsername(): String = username

    override fun isAccountNonExpired(): Boolean = true
    override fun isAccountNonLocked(): Boolean = true
    override fun isCredentialsNonExpired(): Boolean = true
    override fun isEnabled(): Boolean = true
}

fun UserEntity.toUserDto(): UserDto = UserDto(name, surname, username, email)