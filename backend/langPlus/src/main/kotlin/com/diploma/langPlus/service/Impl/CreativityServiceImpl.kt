package com.diploma.langPlus.service.Impl

import com.diploma.langPlus.dto.CreativeEventDto
import com.diploma.langPlus.dto.PlaceCreativeEventDto
import com.diploma.langPlus.entity.CreativeEventEntity
import com.diploma.langPlus.entity.PlaceCreativeEventEntity
import com.diploma.langPlus.entity.toDto
import com.diploma.langPlus.repository.CreativeEventRepository
import com.diploma.langPlus.repository.PlaceCreativeEventRepository
import com.diploma.langPlus.repository.TeamRepository
import com.diploma.langPlus.service.CreativityService
import org.springframework.stereotype.Service

@Service
class CreativityServiceImpl(
    val creativeEventRepository: CreativeEventRepository,
    val placeCreativeEventRepository: PlaceCreativeEventRepository,
    val teamRepository: TeamRepository
): CreativityService {
    override fun getAllCreativeEvents(): List<CreativeEventDto> {
        return creativeEventRepository.findAll().map { it.toDto() }
    }

    override fun addCreativeEvent(event: CreativeEventDto) {
        if (creativeEventRepository.findByTitle(event.title) != null) {
            throw Exception("Творческое мероприятие \"${event.title}\" уже добавлено!")
        }
        creativeEventRepository.save(CreativeEventEntity(0, event.title, emptyList()))
    }

    override fun deleteCreativeEvent(title: String) {
        val event = creativeEventRepository.findByTitle(title)
                ?: throw Exception("Творческого мероприятия \"$title\" не существует!")
        creativeEventRepository.delete(event)
    }

    override fun getPlacesByEvent(title: String): List<PlaceCreativeEventDto> {
        return placeCreativeEventRepository.findByEventTitle(title).map { it.toDto() }
    }

    override fun addPlaceToCreativeEvent(placeDto: PlaceCreativeEventDto) {
        val event = creativeEventRepository.findByTitle(placeDto.eventTitle)
            ?: throw Exception("Творческого мероприятия \"${placeDto.eventTitle}\" не существует!")
        val team = teamRepository.findByTitle(placeDto.teamTitle)
            ?: throw Exception("Команды \"${placeDto.teamTitle}\" не существует!")
        if (placeCreativeEventRepository.findByEventTitle(placeDto.eventTitle).any { it.team == team }) {
            throw Exception("Место для команды \"${placeDto.teamTitle}\" уже определено!")
        }
        val placeEntity = PlaceCreativeEventEntity(0, placeDto.place, event, team)
        team.creativeEventPlaces += placeEntity
        event.places += placeEntity

        placeCreativeEventRepository.save(placeEntity)
    }

    override fun deleteTeamFromCreativeEvent(id: Long) {
        placeCreativeEventRepository.deleteById(id)
    }
}