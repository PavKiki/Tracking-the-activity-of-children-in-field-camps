package com.diploma.langPlus.entity

import jakarta.persistence.*
import java.time.LocalDate

@Entity
@Table(name = "points")
class PointsEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,
    val amount: Long,
    val date: LocalDate,
    @ManyToOne
    @JoinColumn(name = "teamId")
    var team: TeamEntity
) {}