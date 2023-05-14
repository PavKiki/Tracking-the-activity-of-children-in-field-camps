package com.diploma.langPlus.repository

import com.diploma.langPlus.entity.TimetableEntity
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.repository.CrudRepository
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDate

interface TimetableRepository: CrudRepository<TimetableEntity, Int> {
    fun findAllByOrderByDate(): List<TimetableEntity>
    fun findByDate(date: LocalDate): TimetableEntity?
    @Transactional
    @Modifying
    fun deleteByDate(date: LocalDate)
}