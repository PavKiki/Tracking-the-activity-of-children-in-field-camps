package com.diploma.langPlus.service

import com.diploma.langPlus.dto.ChartDto
import com.diploma.langPlus.dto.PointsDto
import com.diploma.langPlus.dto.TeamAndPointsDto

interface PointsService {
    fun getPointsOfTeam(title: String): Long
    fun addPoints(dto: PointsDto)
    fun getChart(title: String): List<ChartDto>
}

