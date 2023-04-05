package com.diploma.langPlus.controller

import com.diploma.langPlus.dto.ActivityDto
import com.diploma.langPlus.entity.toDto
import com.diploma.langPlus.service.ActivityService
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@CrossOrigin
@RequestMapping("/api/v1/activity")
class ActivityController(val activityService: ActivityService) {
    @GetMapping("/all")
    fun getAll(): List<ActivityDto> = activityService.getAll().map { it.toDto() }

    @GetMapping("/get")
    fun getByTimetableIdSortByTime(@RequestParam("id") timetableId: Int): List<ActivityDto> {
        return activityService.getByTimetableIdSortByTime(timetableId).map { it.toDto() }
    }
}