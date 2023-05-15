import { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { IActivity } from "models"
import defaultApi from "api/defaultApi"

export function useActivities(timetableId: number) {
    const [activities, setActivities] = useState<IActivity[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect( () => { 
        fetchActivities()
    }, [] )

    async function fetchActivities() {
        try {
            setError("")
            setLoading(true)
            const response = await defaultApi.get<IActivity[]>(
                "activity/get", 
                { params: { id: timetableId } }
            )
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