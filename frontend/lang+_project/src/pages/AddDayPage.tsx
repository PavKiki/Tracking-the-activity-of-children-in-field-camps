import { useState, useContext } from 'react';

import { DatePicker } from "@mui/x-date-pickers";
import { NavigationPanel } from "../components/common/NavigationPanel";
import { ActivityToAdd } from "../components/add_day_page/ActivityToAdd";
import { AddActivityButton } from "../components/add_day_page/AddActivityButton";
import { AddDayContext } from "../context/AddDayContext";

import '../css-components/AddDayPage.css';

export function AddDayPage() {
    const { activitiesToAdd } = useContext(AddDayContext)

    return (
        <>
            <NavigationPanel></NavigationPanel>
                <div className="container-of-fields">
                    <div className="date-picker">
                        <DatePicker label = "Выберите дату"></DatePicker>
                    </div>
                    <div className="container-of-activities">
                        { activitiesToAdd.map ( (activity, index) => <ActivityToAdd activity = { activity } index={ index }/> ) }
                    </div>
                    <AddActivityButton/>
                    <button className="add-timetable-button">
                        <p>Добавить</p>
                    </button>
                </div>
        </>
    )
}