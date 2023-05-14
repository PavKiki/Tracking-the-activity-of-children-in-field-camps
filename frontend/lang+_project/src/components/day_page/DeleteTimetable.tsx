import { Autocomplete, TextField } from "@mui/material";
import api from "api/axios";
import { RedDeleteButton } from "components/RedDeleteButton";
import { useRedDeleteButton } from "hooks/red-delete-button";
import { useTimetables } from "hooks/timetables";
import { useState } from "react";

interface IDeleteTimetable {
    showModal: (text: string, isError: boolean) => void;
}

export function DeleteTimetable(props: IDeleteTimetable) {
    const [curTimetable, setCurTimetable] = useState<string | null>(null)

    const { timetables, refresh, setRefresh } = useTimetables()
    const {redButton, setRedButtonDefault, setRedButtonLoading} = useRedDeleteButton({defaultText: "Удалить"})

    async function deleteTimetable() {
        setRedButtonLoading()
        await api
            .delete(
                "timetable/delete",
                {
                    withCredentials: true,
                    params: { date: curTimetable }
                }
            )
            .then(response => {
                setRedButtonDefault()
                props.showModal(`День ${curTimetable} успешно удалён!`, false)
                setRefresh(!refresh)
            })
            .catch (error => {
                console.error(error)
                props.showModal(error?.response?.data, true)
                setRedButtonDefault()
            })   
    }

    return (
        <>
            {timetables &&
                <div className='delete-timetable-container'>
                    <p>Удалить расписание</p>
                    <div className="field-button">
                        <Autocomplete
                            disablePortal
                            id="combo-box-tournamnets"
                            options={ timetables.map(timetable => timetable.date) }
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Выберите дату" />}
                            value={ curTimetable }
                            onChange={ (event, newValue) => setCurTimetable(newValue) }
                        />
                        <RedDeleteButton onClick={ () => deleteTimetable() }><p>{ redButton }</p></RedDeleteButton>
                    </div>
                </div>
            }
        </>
    )
}