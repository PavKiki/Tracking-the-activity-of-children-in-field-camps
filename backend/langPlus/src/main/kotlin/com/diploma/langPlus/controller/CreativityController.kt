package com.diploma.langPlus.controller

import com.diploma.langPlus.dto.CreativeEventDto
import com.diploma.langPlus.dto.PlaceCreativeEventDto
import com.diploma.langPlus.service.CreativityService
import org.apache.coyote.Response
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("api/v1/creativity")
class CreativityController(
    val creativityService: CreativityService
) {
    @GetMapping("events/all")
    fun getAllCreativeEvents(): ResponseEntity<Any> {
        try {
            return ResponseEntity.ok(creativityService.getAllCreativeEvents())
        }
        catch (e: Exception) {
            return ResponseEntity.badRequest().body(e.message)
        }
    }

    @PostMapping("events/add")
    fun addCreativeEvent(@RequestBody event: CreativeEventDto): ResponseEntity<Any> {
        try {
            creativityService.addCreativeEvent(event)
            return ResponseEntity.ok("Success!")
        }
        catch (e: Exception) {
            return ResponseEntity.badRequest().body(e.message)
        }
    }

    @DeleteMapping("events/delete")
    fun deleteCreativeEvent(@RequestParam title: String): ResponseEntity<Any> {
        try {
            creativityService.deleteCreativeEvent(title)
            return ResponseEntity.ok("Success!")
        }
        catch (e: Exception) {
            return ResponseEntity.badRequest().body(e.message)
        }
    }

    @GetMapping("places/byEvent")
    fun getPlacesByEvent(@RequestParam title: String): ResponseEntity<Any> {
        try {
            return ResponseEntity.ok(creativityService.getPlacesByEvent(title))
        }
        catch (e: Exception) {
            return ResponseEntity.badRequest().body(e.message)
        }
    }

    @PostMapping("places/add")
    fun addPlaceToCreativeEvent(@RequestBody placeDto: PlaceCreativeEventDto): ResponseEntity<Any> {
        try {
            creativityService.addPlaceToCreativeEvent(placeDto)
            return ResponseEntity.ok("Success!")
        }
        catch (e: Exception) {
            return ResponseEntity.badRequest().body(e.message)
        }
    }

    @DeleteMapping("places/delete")
    fun deleteTeamFromCreativeEvent(
        @RequestParam id: Long
    ): ResponseEntity<Any> {
        try {
            creativityService.deleteTeamFromCreativeEvent(id)
            return ResponseEntity.ok("Success!")
        }
        catch (e: Exception) {
            return ResponseEntity.badRequest().body(e.message)
        }
    }
}