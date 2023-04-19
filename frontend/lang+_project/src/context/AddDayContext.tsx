import { createContext, useState } from "react";
import { IActivityToAdd } from "../models";
import moment, { Moment } from "moment";

interface IAddDayContext {
    activitiesToAdd: IActivityToAdd[]
    addActivity: () => void
    deleteActivity: (i: number) => void
    handleChangeTitle: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, i: number) => void
    handleChangeDescription: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, i: number) => void
    handleChangeStartAt: (time: Moment | null, i: number) => void
    handleChangeEndAt: (time: Moment | null, i: number) => void
}

export const AddDayContext = createContext<IAddDayContext>({
    activitiesToAdd: [],
    addActivity: () => {},
    deleteActivity: (i: number) => {},
    handleChangeTitle: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, i: number) => {},
    handleChangeDescription: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, i: number) => {},
    handleChangeStartAt: (time: Moment | null, i: number) => {},
    handleChangeEndAt: (time: Moment | null, i: number) => {}
})

export const AddDayContextProvider = ({children}: {children: React.ReactNode}) => {
    const [activitiesToAdd, setActivitiesToAdd] = useState<IActivityToAdd[]>([
        {description: "вейки вейки", title: "Wake up!", startAt: moment("8:15", "HH:mm"), endAt: moment("8:30", "HH:mm"), timetableId: 0},
        {description: "все станем качками", title: "Morning exercises", startAt: moment("8:30", "HH:mm"), endAt: moment("9:00", "HH:mm"), timetableId: 0},
        {description: "ну жрём", title: "Breakfast", startAt: moment("9:00", "HH:mm"), endAt: moment("9:45", "HH:mm"), timetableId: 0},
        {description: "слушаем че будет", title: "Program announcement", startAt: moment("9:45", "HH:mm"), endAt: moment("10:00", "HH:mm"), timetableId: 0}
    ])

    function addActivity() {
        let newArr: IActivityToAdd[]
        if (activitiesToAdd.length !== 0) newArr = [...activitiesToAdd, {description: "", title: "", startAt: activitiesToAdd[activitiesToAdd.length - 1].endAt, endAt: null, timetableId: 0}]
        else newArr = [...activitiesToAdd, {description: "", title: "", startAt: null, endAt: null, timetableId: 0}]
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

    const value = {
        activitiesToAdd,
        addActivity,
        deleteActivity,
        handleChangeTitle,
        handleChangeDescription,
        handleChangeStartAt,
        handleChangeEndAt
    }

    return (
        <AddDayContext.Provider value = { value }> {children} </AddDayContext.Provider>
    );
}