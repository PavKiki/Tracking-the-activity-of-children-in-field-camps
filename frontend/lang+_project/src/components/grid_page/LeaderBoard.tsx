import { IGrid, ITeam, ITeamSportsScore } from "models"

interface ILeaderBoard {
    grid: IGrid
}

interface ITeamAndScore {
    team: ITeam;
    score: ITeamSportsScore;
}

export function LeaderBoard(props: ILeaderBoard) {
    
    let teamAndScore: ITeamAndScore[] = []
    for (let i = 0; i < props.grid.teams.length; i++) {
        teamAndScore.push({ team: props.grid.teams[i], score: props.grid.scores[i] })
    }

    return (
        <table className="sports-leaderboard">
            {teamAndScore.length !== 0 && 
                <tbody>
                    { teamAndScore.sort((a, b) => b.score.points - a.score.points).map((elem) => {
                        return (
                            <tr>
                                <th>{ elem.team.title }</th>
                                <td>{ elem.score.wins }-{ elem.score.draws }-{elem.score.losses }</td>
                            </tr>
                        )
                    }) }
                </tbody>
            }
        </table>
    )
}