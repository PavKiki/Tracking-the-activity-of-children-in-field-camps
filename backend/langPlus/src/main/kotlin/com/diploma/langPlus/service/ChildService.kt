package com.diploma.langPlus.service

import com.diploma.langPlus.dto.ChildDto
import com.diploma.langPlus.entity.ChildEntity

interface ChildService {
    fun getAll(): List<ChildEntity>
    fun getByTeamId(teamId: Int): List<ChildEntity>
    fun getByTeamTitle(title: String): List<ChildEntity>
    fun addToTeam(title: String, dto: ChildDto)
    fun deleteChild(id: Int)
}