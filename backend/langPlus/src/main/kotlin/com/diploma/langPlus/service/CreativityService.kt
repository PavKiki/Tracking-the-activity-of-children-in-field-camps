package com.diploma.langPlus.service

import com.diploma.langPlus.dto.CreativeEventDto
import com.diploma.langPlus.dto.PlaceCreativeEventDto
import com.diploma.langPlus.entity.PlaceCreativeEventEntity

interface CreativityService {
    fun getAllCreativeEvents(): List<CreativeEventDto>
    fun addCreativeEvent(event: CreativeEventDto)
    fun deleteCreativeEvent(title: String)
    fun getPlacesByEvent(title: String): List<PlaceCreativeEventDto>
    fun addPlaceToCreativeEvent(placeDto: PlaceCreativeEventDto)
    fun deleteTeamFromCreativeEvent(id: Long)
}