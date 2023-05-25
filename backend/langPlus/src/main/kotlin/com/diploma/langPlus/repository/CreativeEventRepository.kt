package com.diploma.langPlus.repository

import com.diploma.langPlus.entity.CreativeEventEntity
import org.springframework.data.repository.CrudRepository

interface CreativeEventRepository: CrudRepository<CreativeEventEntity, Long> {
    fun findByTitle(title: String): CreativeEventEntity?
}