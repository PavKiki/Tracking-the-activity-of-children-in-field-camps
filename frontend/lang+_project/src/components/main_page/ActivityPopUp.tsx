import { IActivity } from "../../models";

import "../../css-components/ActivityPopUp.css";

import { useContext } from "react";
import { ActivityPopUpContext } from "../../context/ActivityPopUpContext";

interface ActivityPopUpProps {
    activity: IActivity
}


export function ActivityPopUp({ activity }: ActivityPopUpProps) {
    const { position, handleMouseOverPopUp, handleMouseOutPopUp } = useContext(ActivityPopUpContext)

    const style = {
        top: `${position}%`
    }

    return(
        <div className="activity-pop-up" 
        style={ style }
        onMouseOver = { handleMouseOverPopUp }
        onMouseOut = { handleMouseOutPopUp }>
            <div className="title-time">
                <div className="title">
                    { activity.title }
                </div>
                <div className="time">
                    { activity.startAt + " - " + activity.endAt }
                </div>
            </div>
            <div className="description">
                { activity.description }
            </div>
        </div>
    );
}