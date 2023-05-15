import "css-components/CurrentTimetable.css";

import { useContext } from "react";
import { ITimetable } from "models";
import { Timetable } from "components/main_page/Timetable";
import { ActivityPopUpContext } from "context/ActivityPopUpContext";
import { ActivityPopUp } from "components/main_page/ActivityPopUp";

interface CurrentTimetableProps {
    timetable: ITimetable;
}

export function CurrentTimetable({ timetable }: CurrentTimetableProps) {
    const times: string[] = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];

    const { isHovering, activity } = useContext(ActivityPopUpContext)

    return (
        <div className="container">
            <div className="data">
                <p>{ timetable.date }</p>
            </div>
            <div className="time-timetable-container">
                <div className="time">
                    { times.map(time => <p key={time}>{ time }</p>) }
                </div>
                <Timetable timetable={ timetable } isCurrentTimetable = { true }/>
                { isHovering && activity && <ActivityPopUp activity = { activity }/> }
            </div>
        </div>
    )
}