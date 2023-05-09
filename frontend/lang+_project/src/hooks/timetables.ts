import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { ITimetable } from "models";
import api from "api/axios";

export function useTimetables() {
    const [timetables, setTimetables] = useState<ITimetable[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect( () => { 
        fetchTimetables()
    }, [])

    async function fetchTimetables() {      
        try {
            setError("")
            setLoading(true)
            const response = await api.get<ITimetable[]>("timetable/allbydate")
            setTimetables(response.data)
            setLoading(false)
        }
        catch (err: unknown) {
            const error = err as AxiosError
            setError(error.message)
            console.log(error.message)
            setLoading(false) 
        }
    }

    return { timetables, loading, error }
}