package com.diploma.langPlus.entity

import jakarta.persistence.*

@Entity
@Table(name = "activity")
class ActivityEntity (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val activityId: Int,
    val activityName: String,
    val startAt: String,
    val endAt: String,
    @ManyToOne
    @JoinColumn(name = "timetableId")
    var timetable: TimetableEntity,
)