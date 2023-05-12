package com.diploma.langPlus.service.Impl

import com.diploma.langPlus.dto.TeamDto
import com.diploma.langPlus.dto.toEntity
import com.diploma.langPlus.entity.TeamEntity
import com.diploma.langPlus.repository.TeamRepository
import com.diploma.langPlus.service.TeamService
import org.springframework.stereotype.Service

@Service
class TeamServiceImpl(val teamRepository: TeamRepository): TeamService {
    override fun getAll(): List<TeamEntity> = teamRepository.findAll().toList()
    override fun addTeam(teamDto: TeamDto) {
        if (teamRepository.findByTitle(teamDto.title) != null) throw Exception("Команда \"${teamDto.title}\" уже добавлена!")
        teamRepository.save(teamDto.toEntity())
    }
}