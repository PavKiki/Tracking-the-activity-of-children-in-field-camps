package com.diploma.langPlus.repository

import com.diploma.langPlus.entity.SportsTournamentEntity
import org.springframework.data.repository.CrudRepository

interface SportsTournamentRepository: CrudRepository<SportsTournamentEntity, Long> {
    override fun findAll(): List<SportsTournamentEntity>

    fun findByTitle(title: String): SportsTournamentEntity?
}