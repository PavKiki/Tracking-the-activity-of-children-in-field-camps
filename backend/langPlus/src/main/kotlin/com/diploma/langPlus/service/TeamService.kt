package com.diploma.langPlus.service

import com.diploma.langPlus.dto.TeamAndPointsDto
import com.diploma.langPlus.dto.TeamDto
import com.diploma.langPlus.entity.TeamEntity

interface TeamService {
    fun getAll(): List<TeamEntity>
    fun addTeam(teamDto: TeamDto)
    fun deleteTeam(title: String)
    fun getTeamsAndPoints(): List<TeamAndPointsDto>
}