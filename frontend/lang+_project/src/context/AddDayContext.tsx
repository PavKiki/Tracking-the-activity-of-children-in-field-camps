import { createContext, useState } from "react";
import { IActivityToAdd } from "../models";
import moment, { Moment } from "moment";

interface IAddDayContext {
    currentDate: Moment | null
    activitiesToAdd: IActivityToAdd[]
    addActivity: () => void
    deleteActivity: (i: number) => void
    handleChangeTitle: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, i: number) => void
    handleChangeDescription: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, i: number) => void
    handleChangeStartAt: (time: Moment | null, i: number) => void
    handleChangeEndAt: (time: Moment | null, i: number) => void
    handleChangeDate: (date: Moment | null) => void
}

export const AddDayContext = createContext<IAddDayContext>({
    currentDate: null,
    activitiesToAdd: [],
    addActivity: () => {},
    deleteActivity: (i: number) => {},
    handleChangeTitle: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, i: number) => {},
    handleChangeDescription: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, i: number) => {},
    handleChangeStartAt: (time: Moment | null, i: number) => {},
    handleChangeEndAt: (time: Moment | null, i: number) => {},
    handleChangeDate: (date: Moment | null) => {}
})

export const AddDayContextProvider = ({children}: {children: React.ReactNode}) => {
    const [currentDate, setCurrentDate] = useState<Moment>(moment().add(1, 'day'))
    
    const [activitiesToAdd, setActivitiesToAdd] = useState<IActivityToAdd[]>([
        {description: "вейки вейки", title: "Wake up!", startAt: moment("8:15", "HH:mm"), endAt: moment("8:30", "HH:mm")},
        {description: "все станем качками", title: "Morning exercises", startAt: moment("8:30", "HH:mm"), endAt: moment("9:00", "HH:mm")},
        {description: "ну жрём", title: "Breakfast", startAt: moment("9:00", "HH:mm"), endAt: moment("9:45", "HH:mm")},
        {description: "слушаем че будет", title: "Program announcement", startAt: moment("9:45", "HH:mm"), endAt: moment("10:00", "HH:mm")}
    ])

    function addActivity() {
        let newArr: IActivityToAdd[]
        if (activitiesToAdd.length !== 0) newArr = [...activitiesToAdd, {description: "", title: "", startAt: activitiesToAdd[activitiesToAdd.length - 1].endAt, endAt: null}]
        else newArr = [...activitiesToAdd, {description: "", title: "", startAt: null, endAt: null}]
        setActivitiesToAdd(newArr)
    }

    function deleteActivity(i: number) {
        const newArr: IActivityToAdd[] = [...activitiesToAdd]
        newArr.splice(i, 1)
        setActivitiesToAdd(newArr)
    }

    function handleChangeTitle(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, i: number) {
        const newArr: IActivityToAdd[] = [...activitiesToAdd]
        newArr[i].title = e.target.value
        setActivitiesToAdd(newArr)
    }

    function handleChangeDescription(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, i: number) {
        const newArr: IActivityToAdd[] = [...activitiesToAdd]
        newArr[i].description = e.target.value
        setActivitiesToAdd(newArr)
    }

    function handleChangeStartAt(time: Moment | null, i: number) {
        if (time === null) return
        const newArr: IActivityToAdd[] = [...activitiesToAdd]
        newArr[i].startAt = time
        setActivitiesToAdd(newArr)
    }

    function handleChangeEndAt(time: Moment | null, i: number) {
        if (time === null) return
        const newArr: IActivityToAdd[] = [...activitiesToAdd]
        newArr[i].endAt = time
        if (i + 1 !== newArr.length) newArr[i+1].startAt = time
        setActivitiesToAdd(newArr)
    }

    function handleChangeDate(date: Moment | null) {
        if (date === null) return
        setCurrentDate(date)
    }

    const value = {
        currentDate,
        activitiesToAdd,
        addActivity,
        deleteActivity,
        handleChangeTitle,
        handleChangeDescription,
        handleChangeStartAt,
        handleChangeEndAt,
        handleChangeDate
    }

    return (
        <AddDayContext.Provider value = { value }> {children} </AddDayContext.Provider>
    );
}