import { createContext, useState } from "react";
import { IActivity } from "models";

interface IActivityPopUpContext {
    activity: IActivity | undefined
    isHovering: boolean
    position: number
    handleMouseOver: (activity: IActivity, position: number) => void
    handleMouseOut: () => void
    handleMouseOverPopUp: () => void
    handleMouseOutPopUp: () => void
}

export const ActivityPopUpContext = createContext<IActivityPopUpContext>({
    activity: {id: 0, title: "", description: "", startAt: "", endAt: "", timetableId: 0},
    isHovering: false,
    position: 0,
    handleMouseOver: (activity: IActivity, position: number) => {},
    handleMouseOut: () => {},
    handleMouseOverPopUp: () => {},
    handleMouseOutPopUp: () => {}
})

export const ActivityPopUpContextProvider = ({children}: {children: React.ReactNode}) => {
    const [activity, setActivity] = useState<IActivity>()
    const [isHovering, setIsHovering] = useState<boolean>(false)
    const [position, setPosition] = useState<number>(0)

    function handleMouseOver(activity: IActivity, position: number) {
        setPosition(position)
        setActivity(activity)
        setIsHovering(true)
    }

    function handleMouseOut() {
        setIsHovering(false)
    }

    function handleMouseOverPopUp() {
        setIsHovering(true)
    }

    function handleMouseOutPopUp() {
        setIsHovering(false)
    }

    const value = {
        activity,
        isHovering,
        position,
        handleMouseOver,
        handleMouseOut,
        handleMouseOverPopUp,
        handleMouseOutPopUp
    }

    return (
        <ActivityPopUpContext.Provider value = { value }> { children } </ActivityPopUpContext.Provider>
    )
}