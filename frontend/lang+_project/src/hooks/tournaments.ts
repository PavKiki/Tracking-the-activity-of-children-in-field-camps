import { IModal, ISportsTournament } from "models";
import api from "api/axios";
import { useEffect, useState } from "react";

export function useSportsTournaments() {
    const [tournaments, setTournaments] = useState<ISportsTournament[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [tournamentTitle, setTournamentTitle] = useState<string>("")

    useEffect( () => { 
        fetchTournaments()
    }, [])

    async function addTournament(setButtonLoading: () => void, setButtonDefault: () => void, showModal: (text: string, isError: boolean) => void) {
        setButtonLoading()
        
        const tournamentToUpload: ISportsTournament = { id: 0, title: tournamentTitle }

        await api.post(
            "sports/tournament/add",
            tournamentToUpload,
            {
                withCredentials: true,
            }
        )
        .then(response => {
            setButtonDefault()
            showModal(`Турнир по ${tournamentToUpload.title} успешно добавлен!`, false)
        })
        .catch (error => {
            console.log(error)
            showModal(error?.response?.data, true)
            setButtonDefault()
        })             
    }

    async function fetchTournaments() {      
        setError("")
        setLoading(true)
        
        await api
            .get<ISportsTournament[]>(
                "sports/tournament/getAll",
            )
            .then((response) => {
                setTournaments(response.data)
                setLoading(false)
            })
            .catch((error) => {
                setError(error.message)
                console.log(error.message)
                setLoading(false) 
            })
    }

    return { 
        tournaments, 
        loading, 
        error, 
        setTournamentTitle,
        tournamentTitle, 
        addTournament 
    }
}