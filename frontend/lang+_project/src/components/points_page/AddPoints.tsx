import { Autocomplete, TextField } from "@mui/material";
import { BlueUploadButton } from "components/BlueUploadButton";
import { useBlueUploadButton } from "hooks/blue-upload-button";
import { useTeam } from "hooks/teams";
import { IPoints } from "models";
import { useState } from "react";

import authApi from "api/authApi"
import { DatePicker } from "@mui/x-date-pickers";

interface IAddPoints {
    showModal: (text: string, isError: boolean) => void;
}

export function AddPoints(props: IAddPoints) {
    const [curTeam, setCurTeam] = useState<string | null>(null)
    const [points, setPoints] = useState<number | null>(null)
    const [currentDate, setCurrentDate] = useState<Date | null>(null)

    const { teams } = useTeam()
    const { blueButton, setBlueButtonDefault, setBlueButtonLoading } = useBlueUploadButton({defaultText: "Добавить"})

    async function addPoints() {
        setBlueButtonLoading()

        if (!points && !curTeam) {
            props.showModal("Не выбрана команда/не введено количество поинтов", false)
            return
        }

        const pointsToUpload: IPoints = { points: points!!, team: curTeam!!, date: currentDate!! }

        await authApi.post(
            "points/add",
            pointsToUpload
        )
        .then(response => {
            setBlueButtonDefault()
            props.showModal(`${pointsToUpload.points} поинтов добавлены команде ${pointsToUpload.team}`, false)
        })
        .catch (error => {
            console.log(error)
            props.showModal(error?.response?.data, true)
            setBlueButtonDefault()
        }) 
    }

    return (
        <>
        {teams &&
            <div className="add-points-container">
                <p id="header">Добавить поинты</p>
                <DatePicker 
                    label = "Выберите дату"
                    value={ currentDate }
                    onChange={ (date) => setCurrentDate(date) }
                />
                <Autocomplete
                    disablePortal
                    id="combo-box-teams"
                    options={ teams.map(team => team.title) }
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Название команды" />}
                    value={ curTeam }
                    onChange={ (event, newValue) => setCurTeam(newValue) }
                    style={ {marginBottom: "2vh", marginTop: "2vh"} }
                />
                <TextField
                    type="number"
                    id="outlined-basic"
                    label="Количество поинтов"
                    variant="outlined"
                    value={ points }
                    onChange={(e) => setPoints(Number(e.target.value))}
                    sx={{ width: 300 }}
                    style={ {marginBottom: "2vh"} }
                />
                <div style={{ height: "5vh" }}></div>
                <BlueUploadButton onClick={ () => addPoints() }><p>{ blueButton }</p></BlueUploadButton>
            </div>
        }
        </>
    )
}