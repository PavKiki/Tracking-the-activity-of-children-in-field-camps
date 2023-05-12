package com.diploma.langPlus.entity

import com.diploma.langPlus.dto.TeamDto
import jakarta.persistence.*

@Entity
@Table(name = "team")
class TeamEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int,
    val title: String,
    @OneToMany(mappedBy = "team")
    var children: List<ChildEntity>,
    @OneToMany(mappedBy = "teamOne")
    var sportEventsFirst: List<SportsEventEntity>,
    @OneToMany(mappedBy = "teamTwo")
    var sportEventsSecond: List<SportsEventEntity>
)

fun TeamEntity.toDto(): TeamDto = TeamDto(title)