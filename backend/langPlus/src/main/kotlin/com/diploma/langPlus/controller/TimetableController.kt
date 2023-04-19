package com.diploma.langPlus.controller

import com.diploma.langPlus.dto.TimetableDto
import com.diploma.langPlus.entity.toDto
import com.diploma.langPlus.exception.DateAlreadyExists
import com.diploma.langPlus.service.TimetableService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@CrossOrigin
@RequestMapping("api/v1/timetable")
class TimetableController (private val timetableService: TimetableService) {
    @GetMapping("/all")
    fun getAll(): List<TimetableDto> = timetableService.getAll().map { it.toDto() }

    @GetMapping("/allbydate")
    fun getAllSortByDate(): List<TimetableDto> = timetableService.getAllSortByDate().map { it.toDto() }

    @PostMapping("/create")
    fun createTimetable(@RequestBody timetableDto: TimetableDto): ResponseEntity<String> {
        try {
            return ResponseEntity.ok(timetableService.createTimetable(timetableDto).toString())
        }
        catch (e: DateAlreadyExists) {
            return ResponseEntity.badRequest().body("Timetable with date ${timetableDto.date} already exists!")
        }
    }
}