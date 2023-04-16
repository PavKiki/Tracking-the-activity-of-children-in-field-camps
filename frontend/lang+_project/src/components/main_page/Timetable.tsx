import { ITimetable } from "../../models";
import { useActivities } from "../../hooks/activities";
import { Activity } from "./Activity";
import "../../css-components/Timetable.css";

interface TimetalbeProps {
    timetable: ITimetable
}

export function Timetable({ timetable }: TimetalbeProps) {
    const colors = new Array<string>("#C1C8E4", "#8860D0", "#5680E9", "#84CEEB", "#5AB9EA")
    let curColorIndex: number = colors.length - 1
    let bgColor: string = colors[curColorIndex]

    const { activities, loading, error } = useActivities(timetable?.id)

    return (
        <div className="activity-container">
            { loading && <div>Loading...</div>}
            { error && <div>{ error }</div>}
            { activities.map(
                (activity) => {
                    if (curColorIndex === colors.length - 1) curColorIndex = 0
                    else curColorIndex++
                    bgColor = colors[curColorIndex]
                    return <Activity activity={ activity } bgColor={ bgColor } key={ activity.id }/> 
                }
            )}
        </div>
    );
}