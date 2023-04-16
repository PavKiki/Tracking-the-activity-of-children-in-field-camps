import { TimePicker } from "@mui/x-date-pickers";
import { TextField } from '@mui/material';
import "../../css-components/ActivityToAdd.css";

export function ActivityToAdd() {
    return (
        <div className="activity">
            <div className="time-picker">
                <div><TimePicker format = "HH:mm" label = "Начало"></TimePicker></div>
                <div><TimePicker format = "HH:mm" label = "Конец"></TimePicker></div>
            </div>
            <div className="name-description">
                <div><TextField label="Название" variant="standard" /></div>
                <div><TextField fullWidth multiline rows="3" label="Описание" /></div>
            </div>
        </div>
    );
}