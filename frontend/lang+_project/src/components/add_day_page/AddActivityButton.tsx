import { useContext } from "react";

import { AddDayContext } from "context/AddDayContext";

import addCircle from "data/images/add_circle_FILL1_wght700_GRAD0_opsz48.svg"
import "css-components/AddActivityButton.css";

export function AddActivityButton() {

    const { addActivity } = useContext(AddDayContext)

    return (
        <div className="add-new-activity">
            <div className="add-new-activity-button" onClick={ () => addActivity() }>
                <img src = { addCircle } alt = "Значок плюса для добавления мероприятия"></img>
                <p>Добавить мероприятие</p>
            </div>
        </div>
    )
}