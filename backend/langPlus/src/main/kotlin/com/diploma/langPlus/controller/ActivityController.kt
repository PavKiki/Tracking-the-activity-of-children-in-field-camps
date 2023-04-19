package com.diploma.langPlus.controller

import com.diploma.langPlus.dto.ActivityDto
import com.diploma.langPlus.entity.toDto
import com.diploma.langPlus.exception.TimetableNotFound
import com.diploma.langPlus.service.ActivityService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

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

    @PostMapping("/add")
    fun addActivityToTimetable(
        @RequestBody activityDto: ActivityDto
    ): ResponseEntity<String> {
        try {
            activityService.addActivity(activityDto)
            return ResponseEntity.ok("Активность успешно добавлена.")
        }
        catch (e: TimetableNotFound) {
            return ResponseEntity.badRequest().body(e.message)
        }
    }
}