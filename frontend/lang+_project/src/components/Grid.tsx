import { useGrid } from "hooks/grid"
import { GridLine } from "./GridLine"
import { ISportsTournament } from "models"

interface IGridProps {
    tournament: ISportsTournament
}

export function Grid(props: IGridProps) {

    const { grid } = useGrid({tournament: props.tournament})
    
    const teams = grid?.teams
    const actualGrid = grid?.events

    return (
        <table>
            {teams && actualGrid &&
                <tbody>
                    { teams.map((team, i) => {
                        return <GridLine teamName={ teams[i].title } teamEvents={ actualGrid[i] }/>
                    }) }
                    <tr>
                        <th></th>
                        {teams.map((team) => {
                            return <th>{ team.title }</th>
                        })}
                    </tr>
                </tbody>
            }
        </table>
    )
}