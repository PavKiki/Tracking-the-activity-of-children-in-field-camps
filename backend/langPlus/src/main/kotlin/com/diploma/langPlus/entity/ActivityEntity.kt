package com.diploma.langPlus.entity

import com.diploma.langPlus.dto.ActivityDto
import jakarta.persistence.*
import java.time.OffsetTime
import java.time.format.DateTimeFormatter

@Entity
@Table(name = "activity")
class ActivityEntity (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int,
    val title: String,
    val description: String,
    val startAt: OffsetTime,
    val endAt: OffsetTime,
    @ManyToOne
    @JoinColumn(name = "timetableId")
    var timetable: TimetableEntity,
)

fun ActivityEntity.toDto(): ActivityDto {
    val formatter = DateTimeFormatter.ofPattern("HH:mm")
    return ActivityDto(
        id = this.id,
        title = this.title,
        description = this.description,
        startAt = this.startAt.format(formatter),
        endAt = this.endAt.format(formatter),
        timetableId = this.timetable.id
    )
}