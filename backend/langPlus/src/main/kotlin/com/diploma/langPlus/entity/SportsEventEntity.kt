package com.diploma.langPlus.entity

import jakarta.persistence.*
import java.time.LocalDate

@Entity
@Table(name = "sports_event")
class SportsEventEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,
    val date: LocalDate,
    val teamOnePoints: Int,
    val teamTwoPoints: Int,
    @ManyToOne
    @JoinColumn(name = "team1Id")
    val teamOne: TeamEntity,
    @ManyToOne
    @JoinColumn(name = "team2Id")
    val teamTwo: TeamEntity,
    @ManyToOne
    @JoinColumn(name = "tournamentId")
    val tournament: SportsTournamentEntity
)