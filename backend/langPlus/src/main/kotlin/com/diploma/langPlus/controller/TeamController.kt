package com.diploma.langPlus.controller

import com.diploma.langPlus.dto.TeamDto
import com.diploma.langPlus.entity.toDto
import com.diploma.langPlus.service.TeamService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1/team")
class TeamController(val teamService: TeamService) {
    @GetMapping("/all")
    fun getAll(): ResponseEntity<Any> {
        try {
            return ResponseEntity.ok(teamService.getAll().map { it.toDto() })
        }
        catch (e: Exception) {
            return ResponseEntity.badRequest().body(e.message)
        }
    }

    @PostMapping("/add")
    fun addTeam(
        @RequestBody teamDto: TeamDto
    ): ResponseEntity<Any> {
        try {
            teamService.addTeam(teamDto)
            return ResponseEntity.ok("Success!")
        }
        catch (e: Exception) {
            return ResponseEntity.badRequest().body(e.message)
        }
    }

    @DeleteMapping("/delete")
    fun deleteTeam(
        @RequestParam title: String
    ): ResponseEntity<Any> {
        try {
            teamService.deleteTeam(title)
            return ResponseEntity.ok("Success!")
        }
        catch (e: Exception) {
            return ResponseEntity.badRequest().body(e.message)
        }
    }

    @GetMapping("points")
    fun getPointsAndTeams(): ResponseEntity<Any> {
        try {
            return ResponseEntity.ok(teamService.getTeamsAndPoints())
        }
        catch (e: Exception) {
            return ResponseEntity.badRequest().body(e.message)
        }
    }
}