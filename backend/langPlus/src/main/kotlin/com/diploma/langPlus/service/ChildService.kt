package com.diploma.langPlus.service

import com.diploma.langPlus.entity.ChildEntity

interface ChildService {
    fun getAll(): List<ChildEntity>
    fun getByTeamId(teamId: Int): List<ChildEntity>
}