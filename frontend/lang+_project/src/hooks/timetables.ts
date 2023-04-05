import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { ITimetable } from "../models";

export function useTimetables() {
    const [timetables, setTimetables] = useState<ITimetable[]>([])

    async function fetchTimetables() {      //refactor whole function later
        try {
            const response = await axios.get<ITimetable[]>("localhost:8080/api/v1/timetable/all")
        }
        catch (err) {
            const error = err as AxiosError
            console.log(error.message)
        }
    }

    useEffect(
        () => { fetchTimetables() },
        []
    )

    return { timetables }
}