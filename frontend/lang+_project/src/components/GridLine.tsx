import { ISportsEvent, ITeam } from "models"

interface IGridLineProps {
    teamName: string,
    teamEvents: ISportsEvent[]
}

export function GridLine(props: IGridLineProps) {

    return (
        <tr>
            <th>{ props.teamName }</th>
            { props.teamEvents.map((event, i) => {
                if (!event) return <td>TBD</td>
                else return <td>{props.teamEvents[i].teamOnePoints} : {props.teamEvents[i].teamTwoPoints}</td>
            }) }
        </tr>
    )
}