import { NavigationPanel } from "../components/NavigationPanel";
import { Timetable } from "../components/Timetable";
import { useTimetables } from "../hooks/timetables";

export function MainPage() {
    const { timetables } = useTimetables()
    return (
    <>
        <NavigationPanel></NavigationPanel>
        <div className="timetables-view">
            {/* { timetables.map( timetable => <Timetable timetable={ timetable }></Timetable> ) } */}
            <Timetable timetable={ timetables[0] }/>
        </div>
    </>
    );
}