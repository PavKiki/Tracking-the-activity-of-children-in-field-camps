package com.diploma.langPlus.repository

import com.diploma.langPlus.entity.TeamEntity
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.repository.CrudRepository
import org.springframework.transaction.annotation.Transactional
import java.util.*

interface TeamRepository: CrudRepository<TeamEntity, Int> {
    override fun findById(id: Int): Optional<TeamEntity>
    fun findByTitle(title: String): TeamEntity?

    @Transactional
    @Modifying
    fun deleteByTitle(title: String)
}