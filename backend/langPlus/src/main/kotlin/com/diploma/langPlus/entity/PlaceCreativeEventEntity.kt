package com.diploma.langPlus.entity

import com.diploma.langPlus.dto.PlaceCreativeEventDto
import jakarta.persistence.*

@Entity
@Table(name = "creative_event_place")
class PlaceCreativeEventEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,
    val place: Int,
    @ManyToOne
    @JoinColumn(name = "eventId")
    val event: CreativeEventEntity,
    @ManyToOne
    @JoinColumn(name = "teamId")
    val team: TeamEntity
)

fun PlaceCreativeEventEntity.toDto() = PlaceCreativeEventDto(
    this.id,
    this.place,
    this.event.title,
    this.team.title
)