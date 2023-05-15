package com.diploma.langPlus.service.Impl

import com.diploma.langPlus.dto.PointsDto
import com.diploma.langPlus.entity.PointsEntity
import com.diploma.langPlus.repository.PointsRepository
import com.diploma.langPlus.repository.TeamRepository
import com.diploma.langPlus.service.PointsService
import org.springframework.stereotype.Service
import java.time.LocalDate

@Service
class PointsServiceImpl(
    val pointsRepository: PointsRepository,
    val teamRepository: TeamRepository
): PointsService {
    override fun getPointsOfTeam(title: String): Long {
        val team = teamRepository.findByTitle(title)
            ?: throw Exception("Команды $title не существует!")
        val sum = pointsRepository.sumOfPointsByTeam(team)
        return if (sum == null) 0L else sum
    }

    override fun addPoints(dto: PointsDto) {
        val team = teamRepository.findByTitle(dto.team)
            ?: throw Exception("Команды $dto.team не существует!")
        val pointsEntity = PointsEntity(0, dto.points, LocalDate.now(), team)
        team.points += pointsEntity
        pointsRepository.save(pointsEntity)
    }
}