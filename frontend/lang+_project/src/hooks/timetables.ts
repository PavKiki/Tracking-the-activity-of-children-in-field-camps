import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { ITimetable } from "models";
import api from "api/axios";

export function useTimetables() {
    const [timetables, setTimetables] = useState<ITimetable[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [refresh, setRefresh] = useState<boolean | null>(null)

    useEffect( () => { 
        fetchTimetables()
    }, [refresh])

    async function fetchTimetables() {      
        setError("")
        setLoading(true)
        await api
            .get<ITimetable[]>("timetable/allbydate")
            .then(response => {
                setTimetables(response.data)
                setLoading(false)
            })
            .catch(error => {
                setError(error.message)
                console.log(error.message)
                setLoading(false)
            }) 
    }

    return { timetables, loading, error, refresh, setRefresh }
}