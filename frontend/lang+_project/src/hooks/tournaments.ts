import { ISportsTournament } from "models";
import api from "api/axios";
import { useEffect, useState } from "react";

export function useSportsTournaments() {
    const [tournaments, setTournaments] = useState<ISportsTournament[]>([])
    const [loadingTournaments, setLoadingTournaments] = useState(false)
    const [errorTournaments, setErrorTournaments] = useState("")
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
        setErrorTournaments("")
        setLoadingTournaments(true)
        
        await api
            .get<ISportsTournament[]>(
                "sports/tournament/getAll",
            )
            .then((response) => {
                setTournaments(response.data)
                setLoadingTournaments(false)
            })
            .catch((error) => {
                setErrorTournaments(error.message)
                console.log(error.message)
                setLoadingTournaments(false) 
            })
    }

    return { 
        tournaments, 
        loadingTournaments, 
        errorTournaments, 
        setTournamentTitle,
        tournamentTitle, 
        addTournament 
    }
}