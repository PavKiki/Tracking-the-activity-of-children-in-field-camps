package com.diploma.langPlus.dto

import com.diploma.langPlus.entity.ActivityEntity
import com.diploma.langPlus.entity.TimetableEntity
import java.time.LocalTime
import java.time.OffsetTime
import java.time.ZoneOffset
import java.time.format.DateTimeFormatter

data class ActivityDto(
    val id: Int,
    val title: String,
    val description: String,
    val startAt: String,
    val endAt: String,
    val timetableId: Int
)

fun ActivityDto.toEntity(timetableEntity: TimetableEntity): ActivityEntity {
    val formatter = DateTimeFormatter.ofPattern("HH:mm")
    return ActivityEntity(
        0,
        this.title,
        this.description,
        LocalTime.parse(this.startAt, formatter).atOffset(ZoneOffset.ofHours(3)),
        LocalTime.parse(this.endAt, formatter).atOffset(ZoneOffset.ofHours(3)),
        timetableEntity
    )
}