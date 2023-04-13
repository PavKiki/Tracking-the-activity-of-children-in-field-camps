import { NavigationPanel } from "../components/NavigationPanel";
import { Timetable } from "../components/Timetable";
import { CurrentTimetable } from "../components/CurrentTimetable";
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
        initPreviousDay(moment().subtract(1, 'd'))
        initCurrentDay(moment())
        initNextDay(moment().add(1, 'd'))
    }, [timetables])

    function findDayInArray(setDay: (d: ITimetable) => void, setIndex: (i: number) => void, day: Moment) {
        for (let i = 0; i < timetables.length; i++) {
            if (day === moment(timetables[i].date, "dddd - DD/MM/YY")) {
                setDay(timetables[i])
                setIndex(i)
            }
        }
    }

    function initPreviousDay(day: Moment) {
        if (timetables.length > 0 && day >= moment(timetables[0].date, "dddd - DD/MM/YY")) {
            if (day > moment(timetables[timetables.length - 1].date, "dddd - DD/MM/YY") && timetables.length !== 1) {
                setPreviousDay(timetables[timetables.length - 2])
                setPreviousIndex(timetables.length - 2)
            }
            else findDayInArray(setPreviousDay, setPreviousIndex, day)
        }
    }

    function initCurrentDay(day: Moment) {
        if (timetables.length > 0) {
            if (day < moment(timetables[0].date, "dddd - DD/MM/YY")) {
                setCurrentDay(timetables[0])
                setCurrentIndex(0)
            }
            else if (day > moment(timetables[timetables.length - 1].date, "dddd - DD/MM/YY")) {
                setCurrentDay(timetables[timetables.length - 1])
                setCurrentIndex(timetables.length - 1)
            }
            else findDayInArray(setCurrentDay, setCurrentIndex, day)
        }
    }

    function initNextDay(day: Moment) {
        if (timetables.length > 0 && day <= moment(timetables[timetables.length - 1].date, "dddd - DD/MM/YY")) {
            if (day < moment(timetables[0].date, "dddd - DD/MM/YY") && timetables.length !== 1) {
                setNextDay(timetables[1])
                setNextIndex(1)
            }
            else findDayInArray(setNextDay, setNextIndex, day)
        }
    }

    function checkPreviousIndex(): boolean { return previousIndex !== undefined && previousIndex > 0 }
    function checkNextIndex(): boolean { return nextIndex !== undefined && nextIndex < timetables.length }

    function leftShift() {
        
    }

    return (
    <>
        <NavigationPanel></NavigationPanel>
        { loading && <div>Loading...</div>}
        { error && <div>{ error }</div>}
        { timetables.length > 0 &&
            <div className="timetables-view">
                <div className="previous-timetable">
                    { checkPreviousIndex() && <Timetable timetable={ previousDay!! } key={ previousDay!!.id }></Timetable> }
                </div>
                {currentDay &&
                    <div className="current-timetable">
                        { checkPreviousIndex() && <img src = { arrowLeft } alt="arrow to change the day to the previous"></img>}
                        <CurrentTimetable timetable={ currentDay!! } key={ currentDay!!.id }></CurrentTimetable>
                        { checkNextIndex() && <img src = { arrowRight } alt="arrow to change the day to the next"></img>}
                    </div>
                }
                <div className="next-timetable">
                    { checkNextIndex() && <Timetable timetable={ nextDay!! } key={ nextDay!!.id }></Timetable> }
                </div>
            </div>
        }
    </>
    );
}