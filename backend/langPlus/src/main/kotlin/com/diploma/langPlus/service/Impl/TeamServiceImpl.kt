package com.diploma.langPlus.service.Impl

import com.diploma.langPlus.dto.PointsDto
import com.diploma.langPlus.dto.TeamAndPointsDto
import com.diploma.langPlus.dto.TeamDto
import com.diploma.langPlus.dto.toEntity
import com.diploma.langPlus.entity.TeamEntity
import com.diploma.langPlus.entity.toDto
import com.diploma.langPlus.repository.PointsRepository
import com.diploma.langPlus.repository.TeamRepository
import com.diploma.langPlus.service.TeamService
import org.springframework.dao.EmptyResultDataAccessException
import org.springframework.stereotype.Service
import java.time.LocalDate

@Service
class TeamServiceImpl(
    val teamRepository: TeamRepository,
    val pointsRepository: PointsRepository
): TeamService {
    override fun getAll(): List<TeamEntity> = teamRepository.findAll().toList()
    override fun addTeam(teamDto: TeamDto) {
        if (teamRepository.findByTitle(teamDto.title) != null) throw Exception("Команда \"${teamDto.title}\" уже добавлена!")
        teamRepository.save(teamDto.toEntity())
    }
    override fun deleteTeam(title: String) {
        teamRepository.deleteByTitle(title)
    }

    override fun getTeamsAndPoints(): List<TeamAndPointsDto> {
        val teams = getAll()
        val teamsAndPoints = mutableListOf<TeamAndPointsDto>()
        for (team in teams) {
            teamsAndPoints.add(
                TeamAndPointsDto(
                    team.toDto(),
                    PointsDto(
                        try {
                            pointsRepository.sumOfPointsByTeam(team)
                        } catch (e: EmptyResultDataAccessException) { 0L },
                        team.title,
                        LocalDate.now()
                    )
                )
            )
        }
        return teamsAndPoints
    }

}