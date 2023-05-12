package com.diploma.langPlus.dto

import com.diploma.langPlus.entity.SportsTournamentEntity

data class SportsTournamentDto(
    val id: Long,
    val title: String
)

fun SportsTournamentDto.toEntity(): SportsTournamentEntity = SportsTournamentEntity(this.id, this.title, emptyList())