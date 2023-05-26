package com.diploma.langPlus.controller

import com.diploma.langPlus.dto.PointsDto
import com.diploma.langPlus.service.PointsService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/v1/points")
class PointsController(
    val pointsService: PointsService
) {
    @GetMapping("ofTeam")
    fun getPointsOfTeam(
        @RequestParam title: String
    ): ResponseEntity<Any> {
        try {
            return ResponseEntity.ok(pointsService.getPointsOfTeam(title))
        }
        catch (e: Exception) {
            return ResponseEntity.badRequest().body(e.message)
        }
    }

    @PostMapping("add")
    fun addPoints(
        @RequestBody pointsDto: PointsDto
    ): ResponseEntity<Any> {
        try {
            pointsService.addPoints(pointsDto)
            return ResponseEntity.ok("Success!")
        }
        catch (e: Exception) {
            return ResponseEntity.badRequest().body(e.message)
        }
    }

    @GetMapping("chart")
    fun getChart(
        @RequestParam title: String
    ): ResponseEntity<Any> {
        try {
            return ResponseEntity.ok(pointsService.getChart(title))
        }
        catch (e: Exception) {
            return ResponseEntity.badRequest().body(e.message)
        }
    }
}

