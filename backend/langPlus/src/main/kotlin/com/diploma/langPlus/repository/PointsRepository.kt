package com.diploma.langPlus.repository

import com.diploma.langPlus.dto.TeamAndPointsDto
import com.diploma.langPlus.entity.PointsEntity
import com.diploma.langPlus.entity.TeamEntity
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.query.Param
import java.time.LocalDate

interface PointsRepository: CrudRepository<PointsEntity, Long> {
    @Query("""
        select sum(p.amount) from PointsEntity p
        where p.team = :team
    """)
    fun sumOfPointsByTeam(@Param("team") team: TeamEntity): Long

    @Query("""
        select distinct p.date from PointsEntity p
        where p.team = :team
        order by p.date asc
    """)
    fun getDates(@Param("team") team: TeamEntity): List<LocalDate>

    @Query("""
        select sum(p.amount) from PointsEntity p
        where p.date <= :date and p.team = :team
    """)
    fun getPointsByDate(@Param("date") date: LocalDate, @Param("team") team: TeamEntity): Long
}