import defaultApi from "api/defaultApi";
import { IGrid, ISportsTournament } from "models";
import { useEffect, useState } from "react";

interface IUseGridProps {
    tournament: ISportsTournament;
}

export function useGrid(props: IUseGridProps) {
    const [grid, setGrid] = useState<IGrid | null>(null)
    
    useEffect(() => {
        fetchGrid()
    }, [props.tournament])

    async function fetchGrid() {
        defaultApi
            .get(
                "/sports/getGrid", 
                { 
                    params: {
                        id: props.tournament.id
                    }
                }
            )
            .then((response) => {
                setGrid(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return { grid }
}