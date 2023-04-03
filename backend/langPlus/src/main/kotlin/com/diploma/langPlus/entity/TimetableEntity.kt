package com.diploma.langPlus.entity

import com.diploma.langPlus.dto.TimetableDto
import jakarta.persistence.*

@Entity
@Table(name = "timetable")
class TimetableEntity (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int,
    val date: String,
    @OneToMany(mappedBy = "timetable")
    var activities: List<ActivityEntity>
)

fun TimetableEntity.toDto(): TimetableDto = TimetableDto(this.id, this.date)