package com.diploma.langPlus.service.Impl

import com.diploma.langPlus.entity.ChildEntity
import com.diploma.langPlus.repository.ChildRepository
import com.diploma.langPlus.service.ChildService
import org.springframework.stereotype.Service

@Service
class ChildServiceImpl(val childRepository: ChildRepository): ChildService {
    override fun getAll(): List<ChildEntity> = childRepository.findAll().toList()
    override fun getByTeamId(teamId: Int): List<ChildEntity> = childRepository.findByTeamId(teamId)
}