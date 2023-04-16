import { DatePicker } from "@mui/x-date-pickers";
import { NavigationPanel } from "../components/common/NavigationPanel";
import { ActivityToAdd } from "../components/add_day_page/ActivityToAdd";
import { AddActivityButton } from "../components/add_day_page/AddActivityButton";

import '../css-components/AddDayPage.css';

export function AddDayPage() {
    return (
        <>
            <NavigationPanel></NavigationPanel>
            <div className="container-of-fields">
                <div className="date-picker">
                    <DatePicker label = "Выберите дату"></DatePicker>
                </div>
                <div className="container-of-activities">
                    <ActivityToAdd/>
                    <ActivityToAdd/>
                    <ActivityToAdd/>
                    <ActivityToAdd/>
                    <ActivityToAdd/>
                </div>
                <AddActivityButton/>
                <div className="add-timetable-button">
                    <p>Добавить</p>
                </div>
            </div>
        </>
    )
}