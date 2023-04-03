import { IActivity } from "../models";
import '../css-components/Activity.css';

interface ActivityProps {
    activity: IActivity
}

export function Activity({ activity }: ActivityProps) {
    return(
        <>
            <div className="activity">
                <p>{activity.title}</p>
            </div>
        </>
    );
}