package com.diploma.langPlus.repository

import com.diploma.langPlus.entity.SportsEventEntity
import com.diploma.langPlus.entity.SportsTournamentEntity
import com.diploma.langPlus.entity.TeamEntity
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.query.Param

interface SportsEventRepository: CrudRepository<SportsEventEntity, Long> {
    @Query("""
        select e from SportsEventEntity e
        where ((e.teamOne = :team1 and e.teamTwo = :team2) or (e.teamOne = :team2 and e.teamTwo = :team1)) and e.tournament = :sport
    """)
    fun findGame(
        @Param("team1") team1: TeamEntity,
        @Param("team2") team2: TeamEntity,
        @Param("sport") tournament: SportsTournamentEntity
    ): SportsEventEntity?
}