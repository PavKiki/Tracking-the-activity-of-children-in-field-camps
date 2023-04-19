package com.diploma.langPlus.dto

import com.diploma.langPlus.entity.TimetableEntity
import java.time.LocalDate
import java.time.format.DateTimeFormatter

data class TimetableDto(
    val id: Int,
    val date: String
)

fun TimetableDto.toEntity(): TimetableEntity {
    val formatter = DateTimeFormatter.ofPattern("EEEE - dd/MM/yy")
    return TimetableEntity(
        id = this.id,
        date = LocalDate.parse(this.date, formatter),
        emptyList()
    )
}