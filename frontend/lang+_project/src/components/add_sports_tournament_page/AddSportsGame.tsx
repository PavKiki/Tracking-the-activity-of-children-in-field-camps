import { Autocomplete, TextField } from "@mui/material";
import { BlueUploadButton } from "components/BlueUploadButton";
import { AddSportsContext } from "context/AddSportsContext";
import { useBlueUploadButton } from "hooks/blue-upload-button";
import moment from "moment";
import { useContext, useState } from "react";

export function AddSportsGame() {

    const { tournaments, teams, showModal, addSportsEvent } = useContext(AddSportsContext)
    const { button, setBlueButtonLoading, setBlueButtonDefault } = useBlueUploadButton({defaultText: "Добавить"})

    const [tournamentTitle, setTournamentTitle] = useState<string | null>("")
    const [team1, setTeam1] = useState<string | null>("")
    const [team2, setTeam2] = useState<string | null>("")
    const [team1Points, setTeam1Points] = useState<string | null>(null)
    const [team2Points, setTeam2Points] = useState<string | null>(null)

    return (
        <>
            <div className="new-sports-event">
                <p>Добавить игру</p>
                <Autocomplete
                    disablePortal
                    id="combo-box-tournamnets"
                    options={ tournaments.map(tournament => tournament.title) }
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Введите название турнира" />}
                    value={ tournamentTitle }
                    onChange={ (event, newValue) => setTournamentTitle(newValue) }
                />
                <div className="team1">
                    <Autocomplete
                        disablePortal
                        id="combo-box-team1"
                        options={ teams!!.map(team => team.title) }
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Команда 1" />}
                        value={ team1 }
                        onChange={ (event, newValue) => setTeam1(newValue) }
                    />
                    <TextField
                        type="number"
                        id="outlined-basic"
                        label="Очки"
                        variant="outlined"
                        value={ team1Points }
                        onChange={(e) => setTeam1Points(e.target.value)}
                    />
                </div>
                <div className="team2">
                    <Autocomplete
                        disablePortal
                        id="combo-box-team2"
                        options={ teams!!.map(team => team.title) }
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Команда 2" />}
                        value={ team2 }
                        onChange={ (event, newValue) => setTeam2(newValue) }
                    />
                    <TextField
                        type="number"
                        id="outlined-basic"
                        label="Очки"
                        variant="outlined"
                        value={ team2Points }
                        onChange={(e) => setTeam2Points(e.target.value)}
                    />
                </div>
                <BlueUploadButton onClick={ () => {
                    addSportsEvent(
                        setBlueButtonLoading, 
                        setBlueButtonDefault, 
                        showModal, 
                        {
                            teamOneName: team1!!, 
                            teamTwoName: team2!!, 
                            teamOnePoints: Number(team1Points), 
                            teamTwoPoints: Number(team2Points), 
                            sportTitle: tournamentTitle!!,
                            date: moment().format("DD/MM/YY")
                        }
                )} }>
                    <p>{ button }</p>
                </BlueUploadButton>  
            </div>
        </>
    )
}