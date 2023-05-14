package com.diploma.langPlus.service

import com.diploma.langPlus.dto.TimetableDto
import com.diploma.langPlus.entity.TimetableEntity

interface TimetableService {
    fun getAll(): List<TimetableEntity>
    fun getAllSortByDate(): List<TimetableEntity>
    fun createTimetable(timetableDto: TimetableDto): Int
    fun deleteTimetable(date: String)
}