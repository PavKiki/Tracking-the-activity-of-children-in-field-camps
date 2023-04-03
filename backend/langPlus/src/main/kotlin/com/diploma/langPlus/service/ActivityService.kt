package com.diploma.langPlus.service

import com.diploma.langPlus.entity.ActivityEntity

interface ActivityService {
    fun getAll(): List<ActivityEntity>
}