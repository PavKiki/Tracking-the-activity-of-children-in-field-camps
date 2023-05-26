package com.diploma.langPlus.dto

import java.time.LocalDate

data class PointsDto(
    val points: Long,
    val team: String,
    val date: LocalDate
)

