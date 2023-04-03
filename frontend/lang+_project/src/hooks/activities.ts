import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { IActivity } from "../models"

export function useActivities(timetableId: number) {
    const [activities, setActivities] = useState<IActivity[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    async function fetchActivities() {
        try {
            setError("")
            setLoading(true)
            const response = await axios.get<IActivity[]>("google.com" + timetableId)
            setActivities(response.data)
            setLoading(false)
        }
        catch (err: unknown) {
            const error = err as AxiosError
            setError(error.message)
            setLoading(false)    
        }
    }

    useEffect( () => { fetchActivities() }, [])

    return { activities, loading, error }
}   