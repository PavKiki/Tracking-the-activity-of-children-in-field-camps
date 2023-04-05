package com.diploma.langPlus.controller

import com.diploma.langPlus.dto.TimetableDto
import com.diploma.langPlus.entity.toDto
import com.diploma.langPlus.service.TimetableService
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@CrossOrigin
@RequestMapping("api/v1/timetable")
class TimetableController (private val timetableService: TimetableService) {
    @GetMapping("/all")
    fun getAll(): List<TimetableDto> = timetableService.getAll().map { it.toDto() }
}