import { useContext, useEffect, useState} from 'react';

import { DatePicker } from "@mui/x-date-pickers";
import { ActivityToAdd } from "components/add_day_page/ActivityToAdd";
import { AddActivityButton } from "components/add_day_page/AddActivityButton";
import { AddDayContext } from "context/AddDayContext";

import { Navigate } from 'react-router';
import { IModal } from 'models';

import 'css-components/AddDayPage.css';
import { useModal } from 'hooks/modal';
import { ModalWindow } from 'components/ModalWindow';
import { BlueAddButton } from 'components/BlueAddButton';
import { useBlueAddButton } from 'hooks/blue-add-button';

export function AddDayPage() {
    const { currentDate, handleChangeDate, activitiesToAdd, uploadTimetable, redirect } = useContext(AddDayContext)

    const { showModal, modal } = useModal()
    const { button, setBlueButtonDefault, setBlueButtonLoading } = useBlueAddButton({defaultText: "Добавить"})
 
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
                <AddActivityButton/>
                <BlueAddButton onClick={ () => uploadTimetable(currentDate!!, setBlueButtonLoading, setBlueButtonDefault, showModal) }>
                    <p>{ button }</p>
                </BlueAddButton>
            </div>
        </>
    )
}