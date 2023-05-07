package com.diploma.langPlus.controller

import com.diploma.langPlus.dto.TeamDto
import com.diploma.langPlus.entity.toDto
import com.diploma.langPlus.service.TeamService
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@CrossOrigin(
    allowCredentials = "true",
    origins = ["http://localhost:3000", "http://localhost:8080"]
)
@RequestMapping("/api/v1/team")
class TeamController(val teamService: TeamService) {
    @GetMapping("/all")
    fun getAll(): List<TeamDto> = teamService.getAll().map { it.toDto() }
}