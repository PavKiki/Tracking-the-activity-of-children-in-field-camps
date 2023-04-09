import { NavigationPanel } from "../components/NavigationPanel";
import { Timetable } from "../components/Timetable";
import { CurrentTimetable } from "../components/CurrentTimetable";
import { useTimetables } from "../hooks/timetables";
import arrowRight from "../data/images/chevron_right_FILL0_wght400_GRAD0_opsz48.svg"
import arrowLeft from "../data/images/chevron_left_FILL0_wght400_GRAD0_opsz48.svg"
import '../css-components/MainPage.css';
import { useState } from "react";
import moment, { Moment } from "moment";
import { ITimetable } from "../models";

export function MainPage() {
    // const today: Moment = moment()
    // const yesterday: Moment = moment().subtract(1, 'd')
    // const tomorrow: Moment = moment().add(1, 'd')

    const { timetables } = useTimetables()

    // const [current, setCurrent] = useState<string>(today.format("dddd - DD/MM/YY"))
    // const [previous, setPrevious] = useState<string>(yesterday.format("dddd - DD/MM/YY"))
    // const [next, setNext] = useState<string>(tomorrow.format("dddd - DD/MM/YY"))

    let day: ITimetable
    let isPreviousExist: boolean
    let isCurrentExist: boolean
    let isNextExist: boolean
    
    function findDay(date: string): boolean {
        if (timetables.length > 0) {
            if (moment() < moment(timetables[0].date, "dddd - DD/MM/YY")) {
                day = timetables[0]
                return true
            }
            else if (moment() > moment(timetables[timetables.length - 1].date, "dddd - DD/MM/YY")) {
                day = timetables[timetables.length - 1]
                return true
            }
            for (let i = 0; i < timetables.length; i++) {
                if (timetables[i].date === date) {
                    day = timetables[i]   
                    return true
                }
            }
        }
        return false
    }

    //крч щас делать влом, поэтому в чем моя идея:
    //делаю булеан функцию инитДэйс и совмещаю её со всем дивом таймтэйбл вью
    //затем происходит инициализация текущего дня, и т.д.
    //насчет кнопок еще не придумал, но думаю нужно будет дописать дополнительную функцию, которая будет анализировать края массива и в зависимости от этогоо
    //нужно будет отображать стрелки и тэйблы
    return (
    <>
        <NavigationPanel></NavigationPanel>
        <div className="timetables-view">
            <div className="previous-timetable">
                { findDay("Monday - 03/04/23") && <Timetable timetable={ day!! } key={ day!!.id }></Timetable> }
            </div>
            { findDay("Tuesday - 04/04/23") &&   
                <div className="current-timetable">
                    <img src = { arrowLeft } alt="arrow to change the day to previous"></img>
                    <CurrentTimetable timetable={ day!! } key={ day!!.id }></CurrentTimetable>
                    <img src = { arrowRight } alt="arrow to change the day to next"></img>
                </div>
            }
            <div className="next-timetable">
                { findDay("Wednesday - 05/04/23") && <Timetable timetable={ day!! } key={ day!!.id }></Timetable> }
            </div>
        </div>
    </>
    );
}