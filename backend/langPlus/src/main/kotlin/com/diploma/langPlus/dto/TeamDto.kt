package com.diploma.langPlus.dto

import com.diploma.langPlus.entity.TeamEntity

data class TeamDto(
    val title: String
)

fun TeamDto.toEntity(): TeamEntity = TeamEntity(0, this.title, emptyList(), emptyList(), emptyList(), emptyList())
