package com.diploma.langPlus.dto

data class GridDto(
    var teams: List<TeamDto>,
    var events: Array<Array<SportsEventDto?>>,
    val scores: List<TeamSportsScoreDto>
)
