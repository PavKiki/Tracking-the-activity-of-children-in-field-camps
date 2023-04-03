import { IActivity, ITimetable } from "../models";
import { useActivities } from "../hooks/activities";
import { Activity } from "./Activity";
import "../css-components/Timetable.css";

interface TimetalbeProps {
    timetable: ITimetable
}

export function Timetable({ timetable }: TimetalbeProps) {
    const { activities, loading, error } = useActivities(timetable.timetableId)
    
    return (
        <div className="activity-container">
            { loading && <div>Loading...</div>}
            { error && <div>{ error }</div>}
            { activities.map(
                (activity: IActivity) => <Activity activity={ activity }/> 
            )}
        </div>
    );
}