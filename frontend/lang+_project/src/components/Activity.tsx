import { IActivity } from "../models";
import '../css-components/Activity.css';
import moment from "moment";

interface ActivityProps {
    activity: IActivity
    bgColor: string
}

export function Activity({ activity, bgColor }: ActivityProps) {
    const duration = moment(activity.endAt, 'HH:mm:ss').diff(moment(activity.startAt, 'HH:mm:ss'), "minutes", true) / 900 * 100
    const position = moment(activity.startAt, 'HH:mm:ss').diff(moment("08:00", 'HH:mm'), "minutes", true) / 900 * 100    //нужно рассчитать в процентах на сколько должен быть отступ
    const style = { height: `${duration}%`,  background: `${bgColor}`, top: `${position}%`}

    return(
        <>
            <div className="activity" style={style}>
                <p>{activity.title}</p>
            </div>
        </>
    );
}