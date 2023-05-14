import { DatePicker } from "@mui/x-date-pickers"
import { DayContext } from "context/DayContext"
import { useBlueUploadButton } from "hooks/blue-upload-button"
import { useContext } from "react"
import { ActivityToAdd } from "./ActivityToAdd"
import { GrayAddButton } from "components/GrayAddButton"
import { BlueUploadButton } from "components/BlueUploadButton"

interface IAddTimetable {
    showModal: (text: string, isError: boolean) => void;
}

export function AddTimetable(props: IAddTimetable) {
    const { currentDate, handleChangeDate, activitiesToAdd, uploadTimetable, addActivity } = useContext(DayContext)
    const { blueButton, setBlueButtonDefault, setBlueButtonLoading } = useBlueUploadButton({defaultText: "Добавить"})

    return (
        <div className="container-of-fields">
            <p>Добавить расписание</p>
            <div className="date-picker">
                <DatePicker 
                    label = "Выберите дату"
                    value={ currentDate }
                    onChange={ (date) => handleChangeDate(date) }
                />
            </div>
            <div className="container-of-activities">
                { activitiesToAdd.map ( (activity, index) => <ActivityToAdd activity = { activity } index={ index } key={index}/> ) }
            </div>
            <GrayAddButton onClick={ () => addActivity() }><p>Добавить мероприятие</p></GrayAddButton>
            <BlueUploadButton onClick={ () => uploadTimetable(currentDate!!, setBlueButtonLoading, setBlueButtonDefault, props.showModal) }>
                <p>{ blueButton }</p>
            </BlueUploadButton>
        </div>
    )
}