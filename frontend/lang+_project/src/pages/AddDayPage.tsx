import { useState, useContext, useEffect } from 'react';

import { DatePicker } from "@mui/x-date-pickers";
import { NavigationPanel } from "../components/common/NavigationPanel";
import { ActivityToAdd } from "../components/add_day_page/ActivityToAdd";
import { AddActivityButton } from "../components/add_day_page/AddActivityButton";
import { AddDayContext } from "../context/AddDayContext";

import '../css-components/AddDayPage.css';
import axios, { AxiosError } from 'axios';
import { IActivity, IActivityToAdd, ITimetable } from '../models';
import { Moment } from 'moment';

export function AddDayPage() {
    const { currentDate, handleChangeDate, activitiesToAdd } = useContext(AddDayContext)

    async function uploadTimetable(date: Moment) {
        try {
            //можно добавить стэйт, который будет изменять кнопку
            const timetableToUpload: ITimetable = { 
                "id": 0,
                "date": date.format("dddd - DD/MM/YY") 
            }
            const response = await axios.post("http://localhost:8080/api/v1/timetable/create", timetableToUpload)
            const timetableId: number = response.data
            activitiesToAdd.forEach ((activity) => uploadActivity(timetableId, activity))
        }
        catch (err) {
            const error = err as AxiosError
            console.log(error.message)
        }
    }

    async function uploadActivity(timetableId: number, activity: IActivityToAdd) {
        try {
            const activityToUpload: IActivity = {
                "id": 0,
                "title": activity.title,
                "description": activity.description,
                "startAt": activity.startAt!!.format("HH:mm"),
                "endAt": activity.endAt!!.format("HH:mm"),
                "timetableId": timetableId
            }
            const reponse = await axios.post("http://localhost:8080/api/v1/activity/add", activityToUpload)
        }
        catch (err) {
            const error = err as AxiosError
            console.log(error.message)
        }
    }

    return (
        <>
            <NavigationPanel></NavigationPanel>
                <div className="container-of-fields">
                    <div className="date-picker">
                        <DatePicker 
                            label = "Выберите дату"
                            value={ currentDate }
                            onChange={ (date) => handleChangeDate(date) }
                        />
                    </div>
                    <div className="container-of-activities">
                        { activitiesToAdd.map ( (activity, index) => <ActivityToAdd activity = { activity } index={ index }/> ) }
                    </div>
                    <AddActivityButton/>
                    <button className="add-timetable-button" onClick={ () => uploadTimetable(currentDate!!) }>
                        <p>Добавить</p>
                    </button>
                </div>
        </>
    )
}