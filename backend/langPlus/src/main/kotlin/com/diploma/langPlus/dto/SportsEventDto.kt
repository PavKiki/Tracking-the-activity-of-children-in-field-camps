package com.diploma.langPlus.dto

data class SportsEventDto(
    val teamOneName: String,
    val teamTwoName: String,
    val teamOnePoints: Int,
    val teamTwoPoints: Int,
    val date: String,
    val sportTitle: String
)