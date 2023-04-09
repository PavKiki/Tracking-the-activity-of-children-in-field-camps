import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { ITimetable } from "../models";

export function useTimetables() {
    const [timetables, setTimetables] = useState<ITimetable[]>([])

    useEffect( () => { 
        fetchTimetables()
    }, [])

    async function fetchTimetables() {      
        try {
            const response = await axios.get<ITimetable[]>("http://localhost:8080/api/v1/timetable/allbydate")
            setTimetables(response.data)
        }
        catch (err: unknown) {
            const error = err as AxiosError
            console.log(error.message)
        }
    }

    return { timetables }
}