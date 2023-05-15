package com.diploma.langPlus.controller

import com.diploma.langPlus.dto.ChildDto
import com.diploma.langPlus.entity.toDto
import com.diploma.langPlus.service.ChildService
import jakarta.persistence.Id
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
@RequestMapping("/api/v1/child")
class ChildController(val childService: ChildService) {
    @GetMapping("/all")
    fun getAll(): ResponseEntity<Any> {
        try {
            return ResponseEntity.ok(childService.getAll().map { it.toDto() })
        }
        catch (e: Exception) {
            return ResponseEntity.badRequest().body(e.message)
        }
    }
    @GetMapping("/byteamId")
    fun getByTeamId(@RequestParam("id") teamId: Int): ResponseEntity<Any>{
        try {
            return ResponseEntity.ok(childService.getByTeamId(teamId).map { it.toDto() })
        }
        catch (e: Exception) {
            return ResponseEntity.badRequest().body(e.message)
        }
    }

    @GetMapping("/byteamTitle")
    fun getByTeamTitle(@RequestParam title: String): ResponseEntity<Any> {
        try {
            return ResponseEntity.ok(childService.getByTeamTitle(title).map { it.toDto() })
        }
        catch (e: Exception) {
            return ResponseEntity.badRequest().body(e.message)
        }
    }

    @PostMapping("/addToTeam")
    fun addToTeam(
        @RequestBody dto: ChildDto,
        @RequestParam title: String
    ): ResponseEntity<Any> {
        try {
            childService.addToTeam(title, dto)
            return ResponseEntity.ok("Success!")
        }
        catch (e: Exception) {
            return ResponseEntity.badRequest().body(e.message)
        }
    }

    @DeleteMapping("/delete")
    fun deleteChild(
        @RequestParam id: Int
    ): ResponseEntity<Any> {
        try {
            childService.deleteChild(id)
            return ResponseEntity.ok("Success!")
        }
        catch (e: Exception) {
            return ResponseEntity.badRequest().body(e.message)
        }
    }
}