package com.diploma.langPlus.service

import com.diploma.langPlus.dto.SportsEventDto
import com.diploma.langPlus.dto.SportsTournamentDto
import com.diploma.langPlus.entity.SportsTournamentEntity

interface SportsService {
    fun addEvent(dto: SportsEventDto)
    fun addTournament(dto: SportsTournamentDto)
    fun getAllTournaments(): List<SportsTournamentDto>
}