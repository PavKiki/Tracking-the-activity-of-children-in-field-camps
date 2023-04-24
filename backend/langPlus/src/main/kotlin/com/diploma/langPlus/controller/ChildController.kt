package com.diploma.langPlus.controller

import com.diploma.langPlus.dto.ChildDto
import com.diploma.langPlus.entity.toDto
import com.diploma.langPlus.service.ChildService
import jakarta.persistence.Id
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@CrossOrigin
@RequestMapping("/api/v1/child")
class ChildController(val childService: ChildService) {
    @GetMapping("/all")
    fun getAll(): List<ChildDto> = childService.getAll().map { it.toDto() }
    @GetMapping("/byteam")
    fun getByTeamId(@RequestParam("id") teamId: Int): List<ChildDto> = childService.getByTeamId(teamId).map { it.toDto() }
}