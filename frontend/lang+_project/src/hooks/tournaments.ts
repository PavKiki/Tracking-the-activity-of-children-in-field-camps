import authApi from "api/authApi"
import defaultApi from "api/defaultApi";
import { ISportsTournament } from "models";
import { useEffect, useState } from "react";

export function useSportsTournaments() {
    const [refreshTournaments, setRefreshTornaments] = useState<boolean>(false)
    const [tournaments, setTournaments] = useState<ISportsTournament[]>([])
    const [loadingTournaments, setLoadingTournaments] = useState(false)
    const [errorTournaments, setErrorTournaments] = useState("")
    const [tournamentTitle, setTournamentTitle] = useState<string>("")

    useEffect( () => { 
        fetchTournaments()
    }, [refreshTournaments])

    async function addTournament(
            setButtonLoading: () => void, 
            setButtonDefault: () => void, 
            showModal: (text: string, isError: boolean) => void,
            setShow: (show: boolean) => void
        ) {
        setButtonLoading()
        
        const tournamentToUpload: ISportsTournament = { id: 0, title: tournamentTitle }

        await authApi.post(
            "sports/tournament/add",
            tournamentToUpload
        )
        .then(response => {
            setButtonDefault()
            showModal(`Турнир по ${tournamentToUpload.title} успешно добавлен!`, false)
            setRefreshTornaments(!refreshTournaments)
            setShow(false)
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
        
        await defaultApi
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
        addTournament,
        refreshTournaments,
        setRefreshTornaments
    }
}