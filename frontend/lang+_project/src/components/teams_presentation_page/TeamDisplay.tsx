import { useKidsInTeam } from "hooks/kids";
import { ITeam } from "models";
import crown from "data/images/crown.svg"
import muscle from 'data/images/arm-muscles-silhouette-svgrepo-com.svg'
import { useEffect, useState } from "react";
import api from "api/axios";

interface ITeamDisplay {
    team: ITeam;
}

export function TeamDisplay(props: ITeamDisplay) {
    const [points, setPoints] = useState<number | null>(null)

    useEffect(() => {
        fetchPoints()
    }, [])

    const { participants } = useKidsInTeam({curTeam: props.team.title})

    async function fetchPoints() {
        if (props.team === null) return
        await api
            .get(
                "points/ofTeam",
                {
                    params: {
                        title: props.team.title
                    }
                }
            )
            .then(response => {
                setPoints(response.data)
            })
            .catch (error => {
                console.log(error)
            })
    }

    return(
        <>
            <div className="team-display">
                <div className="name-points">
                    <p id="title">{ props.team.title }</p>
                    <p id="points">{ points ? points : 0 } points</p>
                </div>
                <div className="participants">
                    { participants.map((kid, i) => {
                        return (
                            <div className="participant" key={ i }>
                                <p>{i + 1}. {kid.surname} {kid.name} {kid.patronymic}</p>
                                {kid.teamRole === "CAPTAIN" && <img src={ crown } id="crown"/>}
                                {kid.teamRole === "COCAPTAIN" && <img src={ muscle } id="muscle"/>}
                            </div>
                        )
                    }) }
                </div>
            </div>
        </>
    )
}