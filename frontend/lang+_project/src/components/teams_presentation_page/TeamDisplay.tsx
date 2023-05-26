import { useKidsInTeam } from "hooks/kids";
import { ITeamAndPoints } from "models";
import crown from "data/images/crown.svg"
import muscle from 'data/images/arm-muscles-silhouette-svgrepo-com.svg'

interface ITeamDisplay {
    teamAndPoints: ITeamAndPoints;
}

export function TeamDisplay(props: ITeamDisplay) {
    const { participants } = useKidsInTeam({curTeam: props.teamAndPoints.team.title})

    return(
        <>
            <div className="team-display">
                <div className="name-points">
                    <p id="title">{ props.teamAndPoints.team.title }</p>
                    <p id="points">{ props.teamAndPoints.points.points } points</p>
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