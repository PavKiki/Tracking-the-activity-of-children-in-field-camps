import { IActivity } from "../models";
import '../css-components/Activity.css';
import moment from "moment";

interface ActivityProps {
    activity: IActivity
}

export function Activity({ activity }: ActivityProps) {
    const interval = moment(activity.endAt, 'HH:mm:ss').diff(moment(activity.startAt, 'HH:mm:ss'), "minutes", true)
    const style = { height: `${interval / 900 * 100}%` }
    return(
        <>
            <div className="activity" style={style}>
                <p>{activity.title}</p>
            </div>
        </>
    );
}