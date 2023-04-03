package com.diploma.langPlus.dto

data class ActivityDto(
    val id: Int,
    val title: String,
    val startAt: Int,
    val endAt: Int,
    val timetableId: Int
)
