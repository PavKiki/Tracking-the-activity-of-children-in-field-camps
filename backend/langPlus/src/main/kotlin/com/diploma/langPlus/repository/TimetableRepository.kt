package com.diploma.langPlus.repository

import com.diploma.langPlus.entity.TimetableEntity
import org.springframework.data.repository.CrudRepository

interface TimetableRepository: CrudRepository<TimetableEntity, Int>