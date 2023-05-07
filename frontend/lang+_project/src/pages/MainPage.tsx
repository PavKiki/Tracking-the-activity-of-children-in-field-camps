import arrowRight from "data/images/chevron_right_FILL0_wght400_GRAD0_opsz48.svg";
import arrowLeft from "data/images/chevron_left_FILL0_wght400_GRAD0_opsz48.svg";
import 'css-components/MainPage.css';

import { Timetable } from "components/main_page/Timetable";
import { CurrentTimetable } from "components/main_page/CurrentTimetable";
import { useTimetables } from "hooks/timetables";
import { useInitDays } from "hooks/init_days";

export function MainPage() {
    const { timetables, loading, error } = useTimetables()

    const { previousDay, currentDay, nextDay, checkPreviousIndex, checkNextIndex, leftShift, rightShift } = useInitDays(timetables)

    return (
    <>
        { loading && <div>Loading...</div>}
        { error && <div>{ error }</div>}
        <div className="timetables-view">
            <div className="previous-timetable">
                { checkPreviousIndex() && <Timetable timetable={ previousDay!! } key={ previousDay!!.id } isCurrentTimetable={ false }></Timetable> }
            </div>
            {currentDay &&
                <div className="current-timetable">
                    { checkPreviousIndex() && <img src = { arrowLeft } alt="arrow to change the day to the previous" onClick={ () => leftShift() }></img>}
                    <CurrentTimetable timetable={ currentDay!! } key={ currentDay!!.id }></CurrentTimetable>
                    { checkNextIndex() && <img src = { arrowRight } alt="arrow to change the day to the next" onClick={ () => rightShift() }></img>}
                </div>
            }
            <div className="next-timetable">
                { checkNextIndex() && <Timetable timetable={ nextDay!! } key={ nextDay!!.id } isCurrentTimetable={ false }></Timetable> }
            </div>
        </div>
    </>
    );
}