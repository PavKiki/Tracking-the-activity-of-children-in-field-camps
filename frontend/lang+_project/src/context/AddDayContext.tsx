import { createContext, useState } from "react";
import { IActivityToAdd } from "../models";

interface IAddDayContext {
    activitiesToAdd: IActivityToAdd[]
    addActivity: () => void
    deleteActivity: (i: number) => void
    saveOnRefreshTitle: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, i: number) => void
    saveOnRefreshDescription: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, i: number) => void
}

export const AddDayContext = createContext<IAddDayContext>({
    activitiesToAdd: [],
    addActivity: () => {},
    deleteActivity: (i: number) => {},
    saveOnRefreshTitle: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, i: number) => {},
    saveOnRefreshDescription: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, i: number) => {}
})

export const AddDayContextProvider = ({children}: {children: React.ReactNode}) => {
    const [activitiesToAdd, setActivitiesToAdd] = useState<IActivityToAdd[]>([])

    function addActivity() {
        const newArr: IActivityToAdd[] = [...activitiesToAdd, {description: "", title: "", startAt: "", endAt: ""}]
        setActivitiesToAdd(newArr)
    }

    function deleteActivity(i: number) {
        const newArr: IActivityToAdd[] = [...activitiesToAdd]
        newArr.splice(i, 1)
        setActivitiesToAdd(newArr)
    }

    function saveOnRefreshTitle(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, i: number) {
        const newArr: IActivityToAdd[] = [...activitiesToAdd]
        newArr[i].title = e.target.value
        setActivitiesToAdd(newArr)
    }

    function saveOnRefreshDescription(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, i: number) {
        const newArr: IActivityToAdd[] = [...activitiesToAdd]
        newArr[i].description = e.target.value
        setActivitiesToAdd(newArr)
    }

    const value = {
        activitiesToAdd,
        addActivity,
        deleteActivity,
        saveOnRefreshTitle,
        saveOnRefreshDescription
    }

    return (
        <AddDayContext.Provider value = { value }> {children} </AddDayContext.Provider>
    );
}