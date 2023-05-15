package com.diploma.langPlus.service.Impl

import com.diploma.langPlus.dto.ChildDto
import com.diploma.langPlus.entity.ChildEntity
import com.diploma.langPlus.enums.TeamRole
import com.diploma.langPlus.exception.TeamNotFound
import com.diploma.langPlus.repository.ChildRepository
import com.diploma.langPlus.repository.TeamRepository
import com.diploma.langPlus.service.ChildService
import org.springframework.stereotype.Service

@Service
class ChildServiceImpl(
    val childRepository: ChildRepository,
    val teamRepository: TeamRepository
): ChildService {
    override fun getAll(): List<ChildEntity> = childRepository.findAll().toList()
    override fun getByTeamId(teamId: Int): List<ChildEntity> = childRepository.findByTeamId(teamId)
    override fun getByTeamTitle(title: String): List<ChildEntity> = childRepository.findByTeamTitle(title)
    override fun addToTeam(title: String, dto: ChildDto) {
        val team = teamRepository.findByTitle(title)
            ?: throw TeamNotFound("Команды $title не существует!")
        val childEntity = ChildEntity(
            dto.id,
            dto.name,
            dto.surname,
            dto.patronymic,
            dto.age,
            TeamRole.valueOf(dto.teamRole),
            team
        )
        team.children += childEntity
        childRepository.save(childEntity)
    }

    override fun deleteChild(id: Int) {
        childRepository.deleteById(id.toLong())
    }
}