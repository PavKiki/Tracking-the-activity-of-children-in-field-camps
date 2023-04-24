package com.diploma.langPlus.repository

import com.diploma.langPlus.entity.ChildEntity
import org.springframework.data.repository.CrudRepository

interface ChildRepository: CrudRepository<ChildEntity, Int> {
    fun findByTeamId(teamId: Int): List<ChildEntity>
}