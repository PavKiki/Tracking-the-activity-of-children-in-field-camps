package com.diploma.langPlus.service.Impl

import com.diploma.langPlus.entity.TeamEntity
import com.diploma.langPlus.repository.TeamRepository
import com.diploma.langPlus.service.TeamService
import org.springframework.stereotype.Service

@Service
class TeamServiceImpl(val teamRepository: TeamRepository): TeamService {
    override fun getAll(): List<TeamEntity> = teamRepository.findAll().toList()
}