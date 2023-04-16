import { NavigationPanel } from "../components/common/NavigationPanel";
import { Timetable } from "../components/main_page/Timetable";
import { CurrentTimetable } from "../components/main_page/CurrentTimetable";
import { useTimetables } from "../hooks/timetables";
import arrowRight from "../data/images/chevron_right_FILL0_wght400_GRAD0_opsz48.svg"
import arrowLeft from "../data/images/chevron_left_FILL0_wght400_GRAD0_opsz48.svg"
import '../css-components/MainPage.css';
import { useEffect, useState } from "react";
import { ITimetable } from "../models";
import moment, { Moment } from "moment";


export function MainPage() {
    const [previousDay, setPreviousDay] = useState<ITimetable>()
    const [currentDay, setCurrentDay] = useState<ITimetable>()
    const [nextDay, setNextDay] = useState<ITimetable>()

    const [previousIndex, setPreviousIndex] = useState<number>()
    const [currentIndex, setCurrentIndex] = useState<number>()
    const [nextIndex, setNextIndex] = useState<number>()

    const { timetables, loading, error } = useTimetables()
    
    useEffect(() => {
        initDays(moment())
    }, [timetables])

    function initDays(day: Moment) {
        if (timetables.length > 0) {
            if (day < moment(timetables[0].date, "dddd - DD/MM/YY")) {
                setCurrentDay(timetables[0])
                setCurrentIndex(0)
                setPreviousIndex(-1)
                if (timetables.length !== 1) setNextDay(timetables[1])
                setNextIndex(1)
            }
            else if (day > moment(timetables[timetables.length - 1].date, "dddd - DD/MM/YY")) {
                setCurrentDay(timetables[timetables.length - 1])
                setCurrentIndex(timetables.length - 1)
                setNextIndex(timetables.length)
                if (timetables.length !== 1) setPreviousDay(timetables[timetables.length - 2])
                setPreviousIndex(timetables.length - 2)
            }
            else {
                for (let i = 0; i < timetables.length; i++) {
                    if (day === moment(timetables[i].date, "dddd - DD/MM/YY")) {
                        setCurrentDay(timetables[i])
                        setCurrentIndex(i)
                        if (i + 1 < timetables.length) setNextDay(timetables[i + 1])
                        setNextIndex(i + 1)
                        if (i - 1 >= 0) setPreviousDay(timetables[i - 1])
                        setPreviousIndex(i - 1)
                    }
                }
            }
        }
    }

    function checkPreviousIndex(): boolean { return previousIndex !== undefined && previousIndex >= 0 }
    function checkNextIndex(): boolean { return nextIndex !== undefined && nextIndex < timetables.length }

    function leftShift() {
        setCurrentDay(timetables[previousIndex!!])
        setNextDay(timetables[currentIndex!!])
        setNextIndex(currentIndex!!)
        setCurrentIndex(previousIndex!!)
        if (previousIndex === 0) {
            setPreviousDay(undefined)
            setPreviousIndex(-1)
        }
        else {
            setPreviousDay(timetables[previousIndex!! - 1])
            setPreviousIndex(previousIndex!! - 1)
        }
    }

    function rightShift() {
        setPreviousDay(timetables[currentIndex!!])
        setCurrentDay(timetables[nextIndex!!])
        setPreviousIndex(currentIndex!!)
        setCurrentIndex(nextIndex!!)
        if (nextIndex === timetables.length - 1) {
            setNextDay(undefined)
            setNextIndex(timetables.length)
        }
        else {
            setNextDay(timetables[nextIndex!! + 1])
            setNextIndex(nextIndex!! + 1)
        }
    }

    return (
    <>
        <NavigationPanel></NavigationPanel>
        { loading && <div>Loading...</div>}
        { error && <div>{ error }</div>}
        <div className="timetables-view">
            <div className="previous-timetable">
                { checkPreviousIndex() && <Timetable timetable={ previousDay!! } key={ previousDay!!.id }></Timetable> }
            </div>
            {currentDay &&
                <div className="current-timetable">
                    { checkPreviousIndex() && <img src = { arrowLeft } alt="arrow to change the day to the previous" onClick={ () => leftShift() }></img>}
                    <CurrentTimetable timetable={ currentDay!! } key={ currentDay!!.id }></CurrentTimetable>
                    { checkNextIndex() && <img src = { arrowRight } alt="arrow to change the day to the next" onClick={ () => rightShift() }></img>}
                </div>
            }
            <div className="next-timetable">
                { checkNextIndex() && <Timetable timetable={ nextDay!! } key={ nextDay!!.id }></Timetable> }
            </div>
        </div>
    </>
    );
}