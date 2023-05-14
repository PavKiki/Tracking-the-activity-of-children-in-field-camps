package com.diploma.langPlus.service.Impl

import com.diploma.langPlus.dto.TimetableDto
import com.diploma.langPlus.dto.toEntity
import com.diploma.langPlus.entity.TimetableEntity
import com.diploma.langPlus.exception.DateAlreadyExists
import com.diploma.langPlus.repository.TimetableRepository
import com.diploma.langPlus.service.TimetableService
import org.springframework.stereotype.Service
import java.time.LocalDate
import java.time.format.DateTimeFormatter

@Service
class TimetableServiceImpl(private val timetableRepository: TimetableRepository): TimetableService {
    override fun getAll(): List<TimetableEntity> = timetableRepository.findAll().toList()
    override fun getAllSortByDate(): List<TimetableEntity> = timetableRepository.findAllByOrderByDate().toList()
    override fun createTimetable(timetableDto: TimetableDto): Int {
        val entity = timetableDto.toEntity()
        if (timetableRepository.findByDate(entity.date) != null) {
            throw DateAlreadyExists("Расписание на \"${entity.date}\" уже добавлено!")
        }
        val newTimetable: TimetableEntity = timetableRepository.save(entity)
        return newTimetable.id
    }

    override fun deleteTimetable(date: String) {
        val formatter = DateTimeFormatter.ofPattern("EEEE - dd/MM/yy")
        timetableRepository.deleteByDate(LocalDate.parse(date, formatter))
    }
}