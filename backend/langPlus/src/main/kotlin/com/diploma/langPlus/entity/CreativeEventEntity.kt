package com.diploma.langPlus.entity

import com.diploma.langPlus.dto.CreativeEventDto
import jakarta.persistence.*

@Entity
@Table(name = "creative_event")
class CreativeEventEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,
    val title: String,
    @OneToMany(mappedBy = "event", cascade = [CascadeType.REMOVE])
    var places: List<PlaceCreativeEventEntity>
)

fun CreativeEventEntity.toDto() = CreativeEventDto(this.title)