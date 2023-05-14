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
    @OneToMany(mappedBy = "team", cascade = [CascadeType.REMOVE])
    var children: List<ChildEntity>,
    @OneToMany(mappedBy = "teamOne", cascade = [CascadeType.REMOVE])
    var sportEventsFirst: List<SportsEventEntity>,
    @OneToMany(mappedBy = "teamTwo", cascade = [CascadeType.REMOVE])
    var sportEventsSecond: List<SportsEventEntity>
)

fun TeamEntity.toDto(): TeamDto = TeamDto(title)