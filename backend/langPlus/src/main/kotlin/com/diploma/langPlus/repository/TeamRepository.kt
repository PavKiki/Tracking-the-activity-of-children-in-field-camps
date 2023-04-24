package com.diploma.langPlus.repository

import com.diploma.langPlus.entity.TeamEntity
import org.springframework.data.repository.CrudRepository

interface TeamRepository: CrudRepository<TeamEntity, Int> {}