package com.diploma.langPlus.service

import com.diploma.langPlus.dto.PointsDto

interface PointsService {
    fun getPointsOfTeam(title: String): Long
    fun addPoints(dto: PointsDto)
}

