package com.diploma.langPlus.entity

import com.diploma.langPlus.dto.ActivityDto
import jakarta.persistence.*

@Entity
@Table(name = "activity")
class ActivityEntity (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val activityId: Int,
    val title: String,
    val startAt: Int,
    val endAt: Int,
    @ManyToOne
    @JoinColumn(name = "timetableId")
    var timetable: TimetableEntity,
)

fun ActivityEntity.toDto(): ActivityDto = ActivityDto(
    activityId = this.activityId,
    title = this.title,
    startAt = this.startAt,
    endAt = this.endAt,
)