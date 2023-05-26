import crown from "data/images/crown.svg"
import muscle from 'data/images/arm-muscles-silhouette-svgrepo-com.svg'
import expandMore from "data/images/expand_more_FILL0_wght400_GRAD0_opsz48.svg"
import expandLess from "data/images/expand_less_FILL0_wght400_GRAD0_opsz48.svg"

import { useKidsInTeam } from "hooks/kids";
import { ITeamAndPoints } from "models";
import { Chart } from "./Chart";
import { useState } from "react";

interface ITeamDisplay {
    teamAndPoints: ITeamAndPoints;
}

export function TeamDisplay(props: ITeamDisplay) {
    const { participants } = useKidsInTeam({curTeam: props.teamAndPoints.team.title})
    const [showChart, setShowChart] = useState<boolean>(false)

    return(
        <>
            <div className="team-display">
                <div className="name-points">
                    <p id="title">{ props.teamAndPoints.team.title }</p>
                    <p id="points">{ props.teamAndPoints.points.points } points</p>
                    {showChart ? 
                        <img src={ expandLess } id="less" onClick={() => setShowChart(false)} alt="close chart"/>
                        : <img src={ expandMore } id="more" onClick={() => setShowChart(true)} alt="show chart"/>
                    }
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
            {showChart && <Chart teamTitle={props.teamAndPoints.team.title}/>}
        </>
    )
}