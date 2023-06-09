import defaultApi from "api/defaultApi"
import { ITeam } from "models"
import { useEffect, useState } from "react"

export function useTeam() {
    const [teams, setTeams] = useState<ITeam[] | null>(null)
    const [refresh, setRefresh] = useState<boolean | null>(null)
    
    useEffect(() => {
        fetchTeams()
    }, [refresh])

    async function fetchTeams() {
        defaultApi
            .get(
                "/team/all", 
            )
            .then((response) => {
                setTeams(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return { teams, refresh, setRefresh }
}