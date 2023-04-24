import { IActivity } from "../../models";

import { useContext } from "react";
import moment from "moment";

import '../../css-components/Activity.css';
import { ActivityPopUpContext } from "../../context/ActivityPopUpContext";

interface ActivityProps {
    activity: IActivity
    bgColor: string
}

export function Activity({ activity, bgColor }: ActivityProps) {
    const { handleMouseOver, handleMouseOut } = useContext(ActivityPopUpContext)

    const duration = moment(activity.endAt, 'HH:mm:ss').diff(moment(activity.startAt, 'HH:mm:ss'), "minutes", true) / 900 * 100
    const position = moment(activity.startAt, 'HH:mm:ss').diff(moment("08:00", 'HH:mm'), "minutes", true) / 900 * 100
    const style = { 
        height: `${duration}%`,  
        background: `${bgColor}`, 
        top: `${position}%`
    }

    return(
        <>
            <div className="activity" 
                style={style} 
                onMouseOver={ () => handleMouseOver(activity, duration + position)}
                onMouseOut={ () => handleMouseOut() }
            >
                <p>{activity.title}</p>
            </div>
        </>
    );
}