package com.diploma.langPlus.repository

import com.diploma.langPlus.entity.SportsTournamentEntity
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.repository.CrudRepository
import org.springframework.transaction.annotation.Transactional

interface SportsTournamentRepository: CrudRepository<SportsTournamentEntity, Long> {
    override fun findAll(): List<SportsTournamentEntity>
    fun findByTitle(title: String): SportsTournamentEntity?
    @Transactional
    @Modifying
    fun deleteByTitle(title: String)
}