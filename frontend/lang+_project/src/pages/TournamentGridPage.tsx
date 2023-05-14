import "css-components/TournamentGridPage.css";
import arrowRight from "data/images/chevron_right_FILL0_wght400_GRAD0_opsz48.svg";
import arrowLeft from "data/images/chevron_left_FILL0_wght400_GRAD0_opsz48.svg";

import { useSportsTournaments } from "hooks/tournaments"
import { useState } from "react";
import { Grid } from "components/grid_page/Grid";
import { useGrid } from "hooks/grid";
import { LeaderBoard } from "components/grid_page/LeaderBoard";

export function TournamentGridPage() {
    const [curIndex, setCurIndex] = useState<number>(0)

    const { tournaments } = useSportsTournaments()
    const { grid } = useGrid({tournament: tournaments[curIndex]})

    return (
        <>
        {tournaments && grid &&
            <div className="grid-page-container">
                <div className="head-switcher">
                    {curIndex > 0 && <img src = { arrowLeft } onClick={ () => setCurIndex(curIndex - 1) } alt="arrow to change the tournament to the previous"/>}
                    <p>{ tournaments[curIndex]?.title }</p>
                    {curIndex < tournaments.length - 1 && <img src = { arrowRight } onClick={ () => setCurIndex(curIndex + 1) } alt="arrow to change the tournament to the next"/>}
                </div>
                <Grid grid={ grid }/>
                <h1 style={ {textAlign: "center", marginTop: "10vh"} }>Leaderboard</h1>
                <LeaderBoard grid={ grid }/>
            </div>
        }
        </>
    )
}