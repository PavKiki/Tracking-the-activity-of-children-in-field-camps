package com.diploma.langPlus.repository

import com.diploma.langPlus.entity.PlaceCreativeEventEntity
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.repository.CrudRepository
import org.springframework.transaction.annotation.Transactional

interface PlaceCreativeEventRepository: CrudRepository<PlaceCreativeEventEntity, Long> {
    fun findByEventTitle(title: String): List<PlaceCreativeEventEntity>
}