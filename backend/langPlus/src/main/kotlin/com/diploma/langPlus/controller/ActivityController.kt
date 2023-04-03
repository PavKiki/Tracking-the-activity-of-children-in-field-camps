package com.diploma.langPlus.controller

import com.diploma.langPlus.dto.ActivityDto
import com.diploma.langPlus.entity.toDto
import com.diploma.langPlus.service.ActivityService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/activity")
class ActivityController(val activityService: ActivityService) {
    @GetMapping
    fun getAll(): List<ActivityDto> = activityService.getAll().map { it.toDto() }
}