package com.diploma.langPlus.repository

import com.diploma.langPlus.entity.ChildEntity
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.repository.CrudRepository
import org.springframework.transaction.annotation.Transactional

interface ChildRepository: CrudRepository<ChildEntity, Int> {
    fun findByTeamId(teamId: Int): List<ChildEntity>
    fun findByTeamTitleOrderByTeamRoleAsc(title: String): List<ChildEntity>
    @Transactional
    @Modifying
    fun deleteById(id: Long)
}