package com.diploma.langPlus.service

import com.diploma.langPlus.dto.ActivityDto
import com.diploma.langPlus.dto.TimetableDto
import com.diploma.langPlus.entity.ActivityEntity

interface ActivityService {
    fun getAll(): List<ActivityEntity>
    fun getByTimetableIdSortByTime(timetableId: Int): List<ActivityEntity>
    fun addActivity(activityDto: ActivityDto)
}