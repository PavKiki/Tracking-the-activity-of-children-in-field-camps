package com.diploma.langPlus.service.Impl

import com.diploma.langPlus.dto.*
import com.diploma.langPlus.entity.SportsEventEntity
import com.diploma.langPlus.entity.TeamEntity
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
            throw Exception("Игра команды \"${team1.title}\" и \"${team2.title}\" в турнире \"${sport.title}\" уже существует!")
        }

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

    override fun deleteEvent(t1: String, t2: String, s: String) {
        val team1 = teamRepository.findByTitle(t1)
            ?: throw TeamNotFound("Команды \"$t1\" не существует!")
        val team2 = teamRepository.findByTitle(t2)
            ?: throw TeamNotFound("Команды \"$t2\" не существует!")
        val sport = sportsTournamentRepository.findByTitle(s)
            ?: throw Exception("Турнира \"$s\" не существует!")
        sportsEventRepository.customDeleteEvent(team1, team2, sport)
    }

    override fun addTournament(dto: SportsTournamentDto) {
        if (sportsTournamentRepository.findByTitle(dto.title) != null) throw Exception("Турнир \"${dto.title}\" уже существует!")
        else sportsTournamentRepository.save(dto.toEntity())
    }

    override fun getGridBySport(tournamentId: Int): GridDto {
        val sport = sportsTournamentRepository.findById(tournamentId.toLong())
        if (sport.isEmpty) throw Exception("Турнира не существует!")

        val teams = teamRepository.findAll().toList()
        val grid: Array<Array<SportsEventDto?>> = Array(teams.size) { Array(teams.size) { null } }
        val leaderboard: List<TeamSportsScoreDto> = teams.map {
            val wins = sportsEventRepository.findWinsOfTeam(it, sport.get())
            val draws = sportsEventRepository.findDrawsOfTeam(it, sport.get())
            val losses = sportsEventRepository.findLossesOfTeam(it, sport.get())
            TeamSportsScoreDto(wins, draws, losses, 2 * wins + draws)
        }

        for (i in 0..teams.lastIndex) {
            for (j in i + 1..teams.lastIndex) {
                val curEvent = sportsEventRepository.findGame(teams[i], teams[j], sport.get())
                if (curEvent != null) {
                    grid[i][j] = formSportsEventDtoByTeam(teams[i], curEvent)
                    grid[j][i] = formSportsEventDtoByTeam(teams[j], curEvent)
                }
            }
        }

        return GridDto(teams.map { it.toDto() }, grid, leaderboard)
    }

    private fun formSportsEventDtoByTeam(team: TeamEntity, event: SportsEventEntity): SportsEventDto {
        if (team == event.teamOne) {
            return SportsEventDto(
                event.teamOne.title,
                event.teamTwo.title,
                event.teamOnePoints,
                event.teamTwoPoints,
                event.date.toString(),
                event.tournament.title
            )
        }
        else {
            return SportsEventDto(
                event.teamTwo.title,
                event.teamOne.title,
                event.teamTwoPoints,
                event.teamOnePoints,
                event.date.toString(),
                event.tournament.title
            )
        }
    }
}