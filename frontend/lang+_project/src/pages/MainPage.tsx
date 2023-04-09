import { NavigationPanel } from "../components/NavigationPanel";
import { Timetable } from "../components/Timetable";
import { CurrentTimetable } from "../components/CurrentTimetable";
import { useTimetables } from "../hooks/timetables";
import arrowRight from "../data/images/chevron_right_FILL0_wght400_GRAD0_opsz48.svg"
import arrowLeft from "../data/images/chevron_left_FILL0_wght400_GRAD0_opsz48.svg"
import '../css-components/MainPage.css';

export function MainPage() {
    const { timetables } = useTimetables()

    

    return (
    <>
        <NavigationPanel></NavigationPanel>
        <div className="timetables-view">
            <div className="previous-timetable">
                { timetables.filter( 
                    timetable => ( timetable?.date === "Tuesday - 04/04/23") ).map( 
                        timetable => <Timetable timetable={ timetable } key={timetable.id}></Timetable>
                    ) 
                }
            </div>
            <img src = { arrowLeft } alt="arrow to change the day to previous"></img>
            <div className="current-timetable">
                { timetables.filter( 
                    timetable => ( timetable?.date === "Wednesday - 05/04/23") ).map( 
                        timetable => <CurrentTimetable timetable={ timetable } key={timetable.id}></CurrentTimetable>
                    ) 
                }
            </div>
            <img src = { arrowRight } alt="arrow to change the day to next"></img>
            <div className="next-timetable">
                { timetables.filter( 
                    timetable => ( timetable?.date === "Tuesday - 04/04/23") ).map( 
                        timetable => <Timetable timetable={ timetable } key={timetable.id}></Timetable>
                    ) 
                }
            </div>
        </div>
    </>
    );
}