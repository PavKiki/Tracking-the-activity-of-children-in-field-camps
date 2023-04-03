package com.diploma.langPlus.service.Impl

import com.diploma.langPlus.entity.ActivityEntity
import com.diploma.langPlus.repository.ActivityRepository
import com.diploma.langPlus.service.ActivityService
import org.springframework.stereotype.Service

@Service
class ActivityServiceImpl(val activityRepository: ActivityRepository): ActivityService {
    override fun getAll(): List<ActivityEntity> {
        return activityRepository.findAll().toList()
    }

    override fun getByTimetableId(timetableId: Int): List<ActivityEntity> {
        return activityRepository.findByTimetableId(timetableId).toList()
    }
}