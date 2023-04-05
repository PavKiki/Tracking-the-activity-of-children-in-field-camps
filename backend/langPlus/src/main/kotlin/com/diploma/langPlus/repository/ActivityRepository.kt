package com.diploma.langPlus.repository

import com.diploma.langPlus.entity.ActivityEntity
import org.springframework.data.repository.CrudRepository

interface ActivityRepository: CrudRepository<ActivityEntity, Int> {
    fun findByTimetableIdOrderByStartAt(timetableId: Int): List<ActivityEntity>
}