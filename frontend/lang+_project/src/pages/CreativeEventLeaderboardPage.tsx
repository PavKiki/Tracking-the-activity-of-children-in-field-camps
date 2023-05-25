import "css-components/CreativeEventLeaderboardPage.css";
import arrowRight from "data/images/chevron_right_FILL0_wght400_GRAD0_opsz48.svg";
import arrowLeft from "data/images/chevron_left_FILL0_wght400_GRAD0_opsz48.svg";

import { useState } from "react";
import { useCreativeEvents } from "hooks/creative_events";
import { CreativityLeaderboard } from "components/creativity_leaderboard_page/CreativityLeaderboard";

export function CreativeEventLeaderboardPage() {
    const [curIndex, setCurIndex] = useState<number>(0)

    const { creativeEvents } = useCreativeEvents()

    return (
        <>
        {creativeEvents &&
            <div className="grid-page-container">
                <div className="head-switcher">
                    {curIndex > 0 && <img src = { arrowLeft } onClick={ () => setCurIndex(curIndex - 1) } alt="arrow to change the tournament to the previous"/>}
                    <p>{ creativeEvents[curIndex]?.title }</p>
                    {curIndex < creativeEvents.length - 1 && <img src = { arrowRight } onClick={ () => setCurIndex(curIndex + 1) } alt="arrow to change the tournament to the next"/>}
                </div>
                <CreativityLeaderboard event={ creativeEvents[curIndex] }/>
            </div>
        }
        </>
    )
}