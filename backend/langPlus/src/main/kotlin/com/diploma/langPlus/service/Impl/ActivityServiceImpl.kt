package com.diploma.langPlus.service.Impl

import com.diploma.langPlus.dto.ActivityDto
import com.diploma.langPlus.dto.toEntity
import com.diploma.langPlus.entity.ActivityEntity
import com.diploma.langPlus.entity.TimetableEntity
import com.diploma.langPlus.entity.addActivity
import com.diploma.langPlus.exception.TimetableNotFound
import com.diploma.langPlus.repository.ActivityRepository
import com.diploma.langPlus.repository.TimetableRepository
import com.diploma.langPlus.service.ActivityService
import org.springframework.stereotype.Service
import java.util.Optional

@Service
class ActivityServiceImpl(val activityRepository: ActivityRepository, val timetableRepository: TimetableRepository): ActivityService {
    override fun getAll(): List<ActivityEntity> {
        return activityRepository.findAll().toList()
    }

    override fun getByTimetableIdSortByTime(timetableId: Int): List<ActivityEntity> {
        return activityRepository.findByTimetableIdOrderByStartAt(timetableId).toList()
    }

    override fun addActivity(activityDto: ActivityDto) {
        val timetable: Optional<TimetableEntity> = timetableRepository.findById(activityDto.timetableId)
        if (timetable.isEmpty) throw TimetableNotFound("There is no timetable with id: ${activityDto.timetableId}")
        val entity = activityRepository.save(activityDto.toEntity(timetable.get()))
        timetable.get().addActivity(entity)
    }
}