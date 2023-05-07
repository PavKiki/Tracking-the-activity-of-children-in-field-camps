import { useContext } from "react";

import { TimePicker } from "@mui/x-date-pickers";
import { TextField } from '@mui/material';
import { IActivityToAdd } from "models";
import { AddDayContext } from "context/AddDayContext";

import closeIcon from "data/images/cancel_FILL0_wght400_GRAD0_opsz48.svg"
import "css-components/ActivityToAdd.css";

interface ActivityToAddProps {
    activity: IActivityToAdd;
    index: number;
}

export function ActivityToAdd({activity, index}: ActivityToAddProps) {
    const { deleteActivity, handleChangeTitle, handleChangeDescription, handleChangeStartAt, handleChangeEndAt } = useContext(AddDayContext)

    return (
        <div className="activity-to-add">
            <div className="time-picker">
                <div>
                    <TimePicker 
                        format = "HH:mm" 
                        label = "Начало"
                        value = { activity.startAt }
                        onChange={ (time) => handleChangeStartAt(time, index) }
                    />
                </div>
                <div>
                    <TimePicker 
                        format = "HH:mm" 
                        label = "Конец"
                        value = { activity.endAt }
                        onChange={ (time) => handleChangeEndAt(time, index) }
                    />
                </div>
            </div>
            <div className="name-description">
                <div>
                    <TextField 
                        label="Название" 
                        variant="standard" 
                        value={ activity.title } 
                        onChange={ (event) => handleChangeTitle(event, index) }
                    />
                </div>
                <div>
                    <TextField 
                        fullWidth
                        multiline 
                        rows="3" 
                        label="Описание" 
                        value={ activity.description } 
                        onChange={ (event) => handleChangeDescription(event, index) }
                    />
                </div>
            </div>
            <div className="delete-activity" onClick={ () => deleteActivity(index) }>
                <img src= { closeIcon } alt = "Delete activity"/>
            </div>
        </div>
    );}