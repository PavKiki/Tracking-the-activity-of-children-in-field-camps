package com.diploma.langPlus.repository

import com.diploma.langPlus.entity.PointsEntity
import com.diploma.langPlus.entity.TeamEntity
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.query.Param

interface PointsRepository: CrudRepository<PointsEntity, Long> {
    @Query("""
        select sum(p.amount) from PointsEntity p
        where p.team = :team
    """)
    fun sumOfPointsByTeam(@Param("team") team: TeamEntity): Long
}