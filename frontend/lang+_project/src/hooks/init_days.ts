import { useEffect, useState } from "react";
import { ITimetable } from "../models";
import moment, { Moment } from "moment";

export function useInitDays(timetables: ITimetable[]) {
    const [previousDay, setPreviousDay] = useState<ITimetable>()
    const [currentDay, setCurrentDay] = useState<ITimetable>()
    const [nextDay, setNextDay] = useState<ITimetable>()

    const [previousIndex, setPreviousIndex] = useState<number>()
    const [currentIndex, setCurrentIndex] = useState<number>()
    const [nextIndex, setNextIndex] = useState<number>()

    useEffect(() => {
        initDays(moment())
    }, [timetables])

    function initDays(day: Moment) {
        if (timetables.length > 0) {
            if (day.isBefore(moment(timetables[0].date, "dddd - DD/MM/YY"), "days")) {
                setCurrentDay(timetables[0])
                setCurrentIndex(0)
                setPreviousIndex(-1)
                if (timetables.length !== 1) setNextDay(timetables[1])
                setNextIndex(1)
            }
            else if (day.isAfter(moment(timetables[timetables.length - 1].date, "dddd - DD/MM/YY"), "days")) {
                setCurrentDay(timetables[timetables.length - 1])
                setCurrentIndex(timetables.length - 1)
                setNextIndex(timetables.length)
                if (timetables.length !== 1) setPreviousDay(timetables[timetables.length - 2])
                setPreviousIndex(timetables.length - 2)
            }
            else {
                for (let i = 0; i < timetables.length; i++) {
                    const timetableDate = moment(timetables[i].date, "dddd - DD/MM/YY")
                    if (day.isSame(timetableDate, "day")) {
                        setCurrentDay(timetables[i])
                        setCurrentIndex(i)
                        if (i + 1 < timetables.length) setNextDay(timetables[i + 1])
                        setNextIndex(i + 1)
                        if (i - 1 >= 0) setPreviousDay(timetables[i - 1])
                        setPreviousIndex(i - 1)
                        break
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

    return { previousDay, currentDay, nextDay, checkPreviousIndex, checkNextIndex, leftShift, rightShift }
}