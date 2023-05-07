import { IActivity } from "models";

import moment from "moment";

import 'css-components/Activity.css';

interface ActivityProps {
    activity: IActivity
    bgColor: string
    handleMouseOver: (activity: IActivity, position: number) => void
    handleMouseOut: () => void
}

export function Activity({ activity, bgColor, handleMouseOut, handleMouseOver }: ActivityProps) {

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