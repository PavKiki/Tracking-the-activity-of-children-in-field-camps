package com.diploma.langPlus.controller

import com.diploma.langPlus.dto.SportsEventDto
import com.diploma.langPlus.dto.SportsTournamentDto
import com.diploma.langPlus.exception.TeamNotFound
import com.diploma.langPlus.service.SportsService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("api/v1/sports")
class SportsController(
    val sportsService: SportsService
) {
    @GetMapping("tournament/getAll")
    fun getAllTournaments(): ResponseEntity<Any> {
        try {
            return ResponseEntity.ok(sportsService.getAllTournaments())
        }
        catch (e: Exception) {
            return ResponseEntity.badRequest().body(e.message)
        }
    }

    @PostMapping("tournament/add")
    fun addSportsTournament(@RequestBody body: SportsTournamentDto): ResponseEntity<Any> {
        try {
            sportsService.addTournament(body)
            return ResponseEntity.ok("Success!")
        }
        catch (e: Exception) {
            return ResponseEntity.badRequest().body(e.message)
        }
    }

    @PostMapping("event/add")
    fun addSportsEvent(@RequestBody body: SportsEventDto): ResponseEntity<Any> {
        try {
            sportsService.addEvent(body)
            return ResponseEntity.ok("Success!")
        }
        catch (e: TeamNotFound) {
            return ResponseEntity.badRequest().body(e.message)
        }
        catch (e: Exception) {
            return ResponseEntity.badRequest().body(e.message)
        }
    }

    @GetMapping("getGrid")
    fun getGridOfTournament(@RequestParam("id") tournamentId: Int): ResponseEntity<Any> {
        try {
            return ResponseEntity.ok(sportsService.getGridBySport(tournamentId))
        }
        catch (e: Exception) {
            return ResponseEntity.badRequest().body(e.message)
        }
    }
}