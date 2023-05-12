package com.diploma.langPlus.entity

import com.diploma.langPlus.dto.SportsTournamentDto
import jakarta.persistence.*

@Entity
@Table(name = "sports_tournament")
class SportsTournamentEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,
    val title: String,
    @OneToMany(mappedBy = "tournament")
    var events: List<SportsEventEntity>
)

fun SportsTournamentEntity.toDto(): SportsTournamentDto = SportsTournamentDto(this.id, this.title)