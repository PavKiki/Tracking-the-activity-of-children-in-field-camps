package com.diploma.langPlus.repository

import com.diploma.langPlus.entity.SportsEventEntity
import com.diploma.langPlus.entity.SportsTournamentEntity
import com.diploma.langPlus.entity.TeamEntity
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.query.Param
import org.springframework.transaction.annotation.Transactional

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

    @Query("""
        select count(e) from SportsEventEntity e
        where ((e.teamOne = :team and e.teamOnePoints > e.teamTwoPoints) or 
            (e.teamTwo = :team and e.teamOnePoints < e.teamTwoPoints)) and
            e.tournament = :sport
    """)
    fun findWinsOfTeam(
        @Param("team") team: TeamEntity,
        @Param("sport") sport: SportsTournamentEntity
    ): Long

    @Query("""
        select count(e) from SportsEventEntity e
        where ((e.teamOne = :team and e.teamOnePoints < e.teamTwoPoints) or 
            (e.teamTwo = :team and e.teamOnePoints > e.teamTwoPoints)) and
            e.tournament = :sport
    """)
    fun findLossesOfTeam(
        @Param("team") team: TeamEntity,
        @Param("sport") sport: SportsTournamentEntity
    ): Long

    @Query("""
        select count(e) from SportsEventEntity e
        where ((e.teamOne = :team or e.teamTwo = :team) and e.teamOnePoints = e.teamTwoPoints) and
            e.tournament = :sport
    """)
    fun findDrawsOfTeam(
        @Param("team") team: TeamEntity,
        @Param("sport") sport: SportsTournamentEntity
    ): Long

    @Transactional
    @Modifying
    @Query("""
        delete from SportsEventEntity e
        where ((e.teamOne = :team1 and e.teamTwo = :team2) or 
                    (e.teamOne = :team2 and e.teamTwo = :team1)) and 
                        e.tournament = :sport
    """)
    fun customDeleteEvent(
        @Param("team1") team1: TeamEntity,
        @Param("team2") team2: TeamEntity,
        @Param("sport") tournament: SportsTournamentEntity
    )
}