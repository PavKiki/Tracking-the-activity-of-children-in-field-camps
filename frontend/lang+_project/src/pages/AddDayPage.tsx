import { useContext } from 'react';

import { DatePicker } from "@mui/x-date-pickers";
import { ActivityToAdd } from "components/add_day_page/ActivityToAdd";
import { AddDayContext } from "context/AddDayContext";

import { Navigate } from 'react-router';

import { useModal } from 'hooks/modal';
import { ModalWindow } from 'components/ModalWindow';

import { BlueUploadButton } from 'components/BlueUploadButton';
import { useBlueUploadButton } from 'hooks/blue-upload-button';
import { GrayAddButton } from 'components/GrayAddButton';

import 'css-components/AddDayPage.css';

export function AddDayPage() {
    const { currentDate, handleChangeDate, activitiesToAdd, uploadTimetable, redirect, addActivity } = useContext(AddDayContext)

    const { showModal, modal } = useModal()
    const { button, setBlueButtonDefault, setBlueButtonLoading } = useBlueUploadButton({defaultText: "Добавить"})
 
    if (redirect) {
        return <Navigate to="/"/>
    }

    return (
        <>
            <ModalWindow modal={modal}/>
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
                <GrayAddButton onClick={ () => addActivity() }><p>Добавить мероприятие</p></GrayAddButton>
                <BlueUploadButton onClick={ () => uploadTimetable(currentDate!!, setBlueButtonLoading, setBlueButtonDefault, showModal) }>
                    <p>{ button }</p>
                </BlueUploadButton>
            </div>
        </>
    )
}