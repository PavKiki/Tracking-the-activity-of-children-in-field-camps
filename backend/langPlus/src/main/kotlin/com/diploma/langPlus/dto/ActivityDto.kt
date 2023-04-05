package com.diploma.langPlus.dto

data class ActivityDto(
    val id: Int,
    val title: String,
    val startAt: String,
    val endAt: String,
    val timetableId: Int
)
