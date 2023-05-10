import { useContext, useState} from 'react';

import { DatePicker } from "@mui/x-date-pickers";
import { ActivityToAdd } from "components/add_day_page/ActivityToAdd";
import { AddActivityButton } from "components/add_day_page/AddActivityButton";
import { AddDayContext } from "context/AddDayContext";

import { Navigate } from 'react-router';
import { IModal } from 'models';

import 'css-components/AddDayPage.css';

export function AddDayPage() {
    const { currentDate, handleChangeDate, activitiesToAdd, uploadTimetable, redirect } = useContext(AddDayContext)
    const [button, setButton] = useState<string>("Добавить")
    const [modal, setModal] = useState<IModal | null>(null)

    if (redirect) {
        return <Navigate to="/"/>
    }

    return (
        <>
            {modal && <div className='add-day-modal' style={ modal.style }>
                <p>{ modal.text }</p>
            </div>}
            <div className="container-of-fields">
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
                <AddActivityButton/>
                <button className="add-timetable-button" onClick={ () => uploadTimetable(currentDate!!, setButton, setModal) }>
                    <p>{ button }</p>
                </button>
            </div>
        </>
    )
}