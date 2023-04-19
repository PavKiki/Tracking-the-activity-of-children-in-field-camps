package com.diploma.langPlus.service.Impl

import com.diploma.langPlus.dto.TimetableDto
import com.diploma.langPlus.dto.toEntity
import com.diploma.langPlus.entity.TimetableEntity
import com.diploma.langPlus.exception.DateAlreadyExists
import com.diploma.langPlus.repository.TimetableRepository
import com.diploma.langPlus.service.TimetableService
import org.springframework.stereotype.Service

@Service
class TimetableServiceImpl(private val timetableRepository: TimetableRepository): TimetableService {
    override fun getAll(): List<TimetableEntity> = timetableRepository.findAll().toList()
    override fun getAllSortByDate(): List<TimetableEntity> = timetableRepository.findAllByOrderByDate().toList()
    override fun createTimetable(timetableDto: TimetableDto): Int {
        val entity = timetableDto.toEntity()
        if (timetableRepository.findByDate(entity.date) != null) throw DateAlreadyExists("Timetable with this date already exists!")
        val newTimetable: TimetableEntity = timetableRepository.save(entity)
        return newTimetable.id
    }
}