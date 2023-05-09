import { useContext} from 'react';

import { DatePicker } from "@mui/x-date-pickers";
import { ActivityToAdd } from "components/add_day_page/ActivityToAdd";
import { AddActivityButton } from "components/add_day_page/AddActivityButton";
import { AddDayContext } from "context/AddDayContext";

import 'css-components/AddDayPage.css';
import { Navigate } from 'react-router';

export function AddDayPage() {
    const { currentDate, handleChangeDate, activitiesToAdd, uploadTimetable, redirect } = useContext(AddDayContext)

    if (redirect) {
        return <Navigate to="/"/>
    }

    return (
        <>
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
                <button className="add-timetable-button" onClick={ () => uploadTimetable(currentDate!!) }>
                    <p>Добавить</p>
                </button>
            </div>
        </>
    )
}