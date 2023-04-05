import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { IActivity } from "../models"

export function useActivities(timetableId: number) {
    const [activities, setActivities] = useState<IActivity[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect( () => { 
        fetchActivities()
        console.log("activities loaded " + timetableId)
    }, [] )

    async function fetchActivities() {
        try {
            setError("")
            setLoading(true)
            const response = await axios.get<IActivity[]>("http://localhost:8080/api/v1/activity/get", { params: { id: timetableId } })
            setActivities(response.data)
            setLoading(false)
        }
        catch (err: unknown) {
            const error = err as AxiosError
            setError(error.message)
            console.log(error.message)
            setLoading(false)    
        }
    }

    return { activities, loading, error }
}   