import { useContext } from "react";

import { IActivity, ITimetable } from "../../models";
import { useActivities } from "../../hooks/activities";
import { Activity } from "./Activity";
import { ActivityPopUpContext } from "../../context/ActivityPopUpContext";

import "../../css-components/Timetable.css";

interface TimetalbeProps {
    timetable: ITimetable
    isCurrentTimetable: boolean
}

export function Timetable({ timetable, isCurrentTimetable }: TimetalbeProps) {
    const colors = new Array<string>("#C1C8E4", "#8860D0", "#5680E9", "#84CEEB", "#5AB9EA")
    let curColorIndex: number = colors.length - 1
    let bgColor: string = colors[curColorIndex]

    const { activities, loading, error } = useActivities(timetable?.id)
    const { handleMouseOver, handleMouseOut } = useContext(ActivityPopUpContext)

    let funMouseOver: (activity: IActivity, position: number) => void
    let funMouseOut: () => void

    if (isCurrentTimetable) {
        funMouseOver = handleMouseOver
        funMouseOut = handleMouseOut
    }
    else {
        funMouseOver = (activity: IActivity, position: number) => {}
        funMouseOut = () => {}
    }

    return (
        <div className="activity-container">
            { loading && <div>Loading...</div>}
            { error && <div>{ error }</div>}
            { activities.map(
                (activity) => {
                    if (curColorIndex === colors.length - 1) curColorIndex = 0
                    else curColorIndex++
                    bgColor = colors[curColorIndex]
                    return <Activity activity={ activity } 
                        bgColor={ bgColor }
                        handleMouseOver={ funMouseOver }
                        handleMouseOut={ funMouseOut }
                        key={ activity.id }
                    /> 
                }
            )}
        </div>
    );
}