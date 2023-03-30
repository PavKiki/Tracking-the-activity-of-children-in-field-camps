package com.diploma.langPlus.service

import com.diploma.langPlus.entity.TimetableEntity

interface TimetableService {
    fun getAll(): List<TimetableEntity>
}