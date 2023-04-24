package com.diploma.langPlus.entity

import com.diploma.langPlus.dto.ChildDto
import jakarta.persistence.*

@Entity
@Table(name = "child")
class ChildEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int,
    val name: String,
    val surname: String,
    val patronymic: String,
    @ManyToOne
    @JoinColumn(name = "teamId")
    var team: TeamEntity
)

fun ChildEntity.toDto(): ChildDto = ChildDto(this.name, this.surname, this.patronymic)