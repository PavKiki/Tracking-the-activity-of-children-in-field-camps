import { ISportsEvent, ITeam } from "models"

interface ICustomBackground {
    backgroundColor: string;
}

interface IGridLineProps {
    teamName: string;
    teamEvents: ISportsEvent[];
    lineIndex: number;
}

export function GridLine(props: IGridLineProps) {

    function chooseStyle(event: ISportsEvent): ICustomBackground {
        let style: ICustomBackground = { backgroundColor: "" }
        if (!event) style.backgroundColor = "#EBEBEB" 
        else if (event.teamOnePoints === event.teamTwoPoints) style.backgroundColor = "#F9FFB6" 
        else if (event.teamOnePoints > event.teamTwoPoints) style.backgroundColor = "#E0FFD8"
        else style.backgroundColor = "#FFD8D8"
        return style
    }

    return (
        <tr>
            <th>{ props.teamName }</th>
            { props.teamEvents.map((event, i) => {
                if (!event) {
                    return props.lineIndex === i ? <td style={ chooseStyle(event) }key={ i }/> : <td style={ chooseStyle(event) }key={ i }>TBD</td>
                }
                else return <td style={ chooseStyle(event)} key={ i }>{props.teamEvents[i].teamOnePoints} : {props.teamEvents[i].teamTwoPoints}</td>
            }) }
        </tr>
    )
}