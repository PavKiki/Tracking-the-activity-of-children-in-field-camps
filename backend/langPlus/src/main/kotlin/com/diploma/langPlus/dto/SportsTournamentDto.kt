package com.diploma.langPlus.dto

import com.diploma.langPlus.entity.SportsTournamentEntity

data class SportsTournamentDto(
    val title: String
)

fun SportsTournamentDto.toEntity(): SportsTournamentEntity = SportsTournamentEntity(0, this.title, emptyList())