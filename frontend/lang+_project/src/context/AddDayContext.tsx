import { createContext, useState } from "react";
import { IActivity, IActivityToAdd, ITimetable } from "models";
import moment, { Moment } from "moment";
import axios, { AxiosError } from "axios";

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
    uploadTimetable: (date: Moment) => void
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
    handleChangeDate: (date: Moment | null) => {},
    uploadTimetable: (date: Moment) => {}
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

    async function uploadTimetable(date: Moment) {
        try {
            //можно добавить стэйт, который будет изменять кнопку
            const timetableToUpload: ITimetable = { 
                "id": 0,
                "date": date.format("dddd - DD/MM/YY") 
            }
            const response = await axios.post(
                "http://localhost:8080/api/v1/timetable/create", 
                timetableToUpload,
                {
                    withCredentials: true,
                }
            )
            const timetableId: number = response.data
            activitiesToAdd.forEach ((activity) => uploadActivity(timetableId, activity))
        }
        catch (err) {
            const error = err as AxiosError
            console.log(error.message)
        }
    }

    async function uploadActivity(timetableId: number, activity: IActivityToAdd) {
        try {
            const activityToUpload: IActivity = {
                "id": 0,
                "title": activity.title,
                "description": activity.description,
                "startAt": activity.startAt!!.format("HH:mm"),
                "endAt": activity.endAt!!.format("HH:mm"),
                "timetableId": timetableId
            }
            const response = await axios.post(
                "http://localhost:8080/api/v1/activity/add", 
                activityToUpload,
                {
                    withCredentials: true
                }
            )
        }
        catch (err) {
            const error = err as AxiosError
            console.log(error.message)
        }
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
        handleChangeDate, 
        uploadTimetable
    }

    return (
        <AddDayContext.Provider value = { value }> {children} </AddDayContext.Provider>
    );
}