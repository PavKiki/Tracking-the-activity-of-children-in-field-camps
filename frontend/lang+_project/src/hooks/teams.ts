import api from "api/axios"
import { ITeam } from "models"
import { useEffect, useState } from "react"

interface IUseTeam {

}

export function useTeam() {
    const [teams, setTeams] = useState<ITeam[] | null>(null)
    
    useEffect(() => {
        fetchTeams()
    }, [])

    async function fetchTeams() {
        api
            .get(
                "/team/all", 
                { withCredentials: true }
            )
            .then((response) => {
                setTeams(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return { teams }
}