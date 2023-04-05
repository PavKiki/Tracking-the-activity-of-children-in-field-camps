package com.diploma.langPlus.entity

import com.diploma.langPlus.dto.TimetableDto
import jakarta.persistence.*
import java.time.LocalDate
import java.time.format.DateTimeFormatter

@Entity
@Table(name = "timetable")
class TimetableEntity (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int,
    val date: LocalDate,
    @OneToMany(mappedBy = "timetable")
    var activities: List<ActivityEntity>
)

fun TimetableEntity.toDto(): TimetableDto {
    val formatter = DateTimeFormatter.ofPattern("EEEE - dd/MM/yy")
    return TimetableDto(this.id, this.date.format(formatter))
}