package com.diploma.langPlus.service.Impl

import com.diploma.langPlus.entity.TimetableEntity
import com.diploma.langPlus.repository.TimetableRepository
import com.diploma.langPlus.service.TimetableService
import org.springframework.stereotype.Service

@Service
class TimetableServiceImpl(private val timetableRepository: TimetableRepository): TimetableService {
    override fun getAll(): List<TimetableEntity> = timetableRepository.findAll().toList()
    override fun getAllSortByDate(): List<TimetableEntity> = timetableRepository.findAllByOrderByDate().toList()
}