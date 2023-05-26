import "css-components/TeamsPresentationPage.css";
import { TeamDisplay } from "components/teams_presentation_page/TeamDisplay";
import { useEffect, useState } from "react";
import { ITeamAndPoints } from "models";
import defaultApi from "api/defaultApi";

export function TeamsPresentationPage() {
    useEffect(() => {
        fetchTeamAndPoints()
    }, [])

    const [teamsAndPoints, setTeamsAndPoints] = useState<ITeamAndPoints[]>()

    async function fetchTeamAndPoints() {
        await defaultApi
            .get(
                "team/points"
            )
            .then(response => {
                setTeamsAndPoints(response.data)
            })
            .catch (error => {
                console.log(error)
            })
    }

    return (
        <>
            {teamsAndPoints && 
                <div className="teams-container">
                    {teamsAndPoints
                        .sort((a: ITeamAndPoints, b: ITeamAndPoints) => b.points.points - a.points.points)
                        .map((entry, i) => <TeamDisplay teamAndPoints={ entry }/>)
                    }
                </div>
            }
        </>
    )
}