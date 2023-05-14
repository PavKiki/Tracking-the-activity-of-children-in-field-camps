package com.diploma.langPlus.service

import com.diploma.langPlus.dto.GridDto
import com.diploma.langPlus.dto.SportsEventDto
import com.diploma.langPlus.dto.SportsTournamentDto

interface SportsService {
    fun addEvent(dto: SportsEventDto)
    fun deleteEvent(t1: String, t2: String, s: String)
    fun addTournament(dto: SportsTournamentDto)
    fun getAllTournaments(): List<SportsTournamentDto>
    fun getGridBySport(tournamentId: Int): GridDto
}