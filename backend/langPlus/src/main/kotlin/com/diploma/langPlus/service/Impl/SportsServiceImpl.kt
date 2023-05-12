package com.diploma.langPlus.service.Impl

import com.diploma.langPlus.dto.SportsEventDto
import com.diploma.langPlus.dto.SportsTournamentDto
import com.diploma.langPlus.dto.toEntity
import com.diploma.langPlus.entity.SportsEventEntity
import com.diploma.langPlus.entity.toDto
import com.diploma.langPlus.exception.TeamNotFound
import com.diploma.langPlus.repository.SportsEventRepository
import com.diploma.langPlus.repository.SportsTournamentRepository
import com.diploma.langPlus.repository.TeamRepository
import com.diploma.langPlus.service.SportsService
import org.springframework.stereotype.Service
import java.time.LocalDate
import java.time.format.DateTimeFormatter

@Service
class SportsServiceImpl(
    val sportsTournamentRepository: SportsTournamentRepository,
    val sportsEventRepository: SportsEventRepository,
    val teamRepository: TeamRepository
): SportsService {
    override fun getAllTournaments(): List<SportsTournamentDto> = sportsTournamentRepository.findAll().map { it.toDto() }

    override fun addEvent(dto: SportsEventDto) {
        val sport = sportsTournamentRepository.findByTitle(dto.sportTitle)
            ?: throw Exception("Турнира \"${dto.sportTitle}\" не существует!")
        if (dto.teamOneName == dto.teamTwoName) throw Exception("Нельзя добавить игру команды с собой!")
        val team1 = teamRepository.findByTitle(dto.teamOneName)
            ?: throw TeamNotFound("Команды с названием ${dto.teamOneName} не существует!")
        val team2 = teamRepository.findByTitle(dto.teamTwoName)
            ?: throw TeamNotFound("Команды с названием ${dto.teamTwoName} не существует!")

        if (sportsEventRepository.findGame(team1, team2, sport) != null) {
            throw Exception("Игра команды \"${team1.title}\" и \"${team2.title}\" в турнире \"${sport.title}\" уже добавлена!")
        }

        //в дальнейшем удалить за ненадобностью
        val formatter = DateTimeFormatter.ofPattern("dd/MM/yy")
        val newEvent = SportsEventEntity(
            id = 0,
            date = LocalDate.parse(dto.date, formatter),
            teamOnePoints = dto.teamOnePoints,
            teamTwoPoints = dto.teamTwoPoints,
            teamOne = team1,
            teamTwo = team2,
            tournament = sport
        )
        sport.events += newEvent
        team1.sportEventsFirst += newEvent
        team2.sportEventsSecond += newEvent

        sportsEventRepository.save(newEvent)
    }

    override fun addTournament(dto: SportsTournamentDto) {
        if (sportsTournamentRepository.findByTitle(dto.title) != null) throw Exception("Турнир \"${dto.title}\" уже существует!")
        else sportsTournamentRepository.save(dto.toEntity())
    }
}