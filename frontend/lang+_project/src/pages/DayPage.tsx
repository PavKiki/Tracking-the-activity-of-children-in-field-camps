import 'css-components/DayPage.css';

import { useContext } from 'react';
import { DayContext } from "context/DayContext";
import { Navigate } from 'react-router';
import { useModal } from 'hooks/modal';
import { ModalWindow } from 'components/ModalWindow';
import { AddTimetable } from 'components/day_page/AddTimetable';
import { DeleteTimetable } from 'components/day_page/DeleteTimetable';

export function DayPage() {
    const { redirect } = useContext(DayContext)
    const { showModal, modal } = useModal()
 
    if (redirect) {
        return <Navigate to="/"/>
    }

    return (
        <>
            <ModalWindow modal={modal}/>
            <DeleteTimetable showModal={ showModal }/>
            <AddTimetable showModal={ showModal }/>
        </>
    )
}