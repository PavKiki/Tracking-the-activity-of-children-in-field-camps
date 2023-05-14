import { GridLine } from "./GridLine"
import { IGrid } from "models"

interface IGridProps {
    grid: IGrid;
}

export function Grid(props: IGridProps) {    
    const teams = props.grid.teams
    const actualGrid = props.grid.events

    return (
        <table className="sports-grid">
            {teams && actualGrid &&
                <tbody>
                    { teams.map((team, i) => {
                        return <GridLine teamName={ teams[i].title } teamEvents={ actualGrid[i]} lineIndex={ i }/>
                    }) }
                    <tr>
                        <th></th>
                        {teams.map((team, i) => {
                            return <th key={ i }>{ team.title }</th>
                        })}
                    </tr>
                </tbody>
            }
        </table>
    )
}