package com.diploma.langPlus.repository

import com.diploma.langPlus.entity.TeamEntity
import org.springframework.data.repository.CrudRepository
import java.util.*

interface TeamRepository: CrudRepository<TeamEntity, Int> {
    override fun findById(id: Int): Optional<TeamEntity>
    fun findByTitle(title: String): TeamEntity?
}