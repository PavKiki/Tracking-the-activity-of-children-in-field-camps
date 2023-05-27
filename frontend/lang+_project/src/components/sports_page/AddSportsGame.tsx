import { Autocomplete, TextField } from "@mui/material";
import { BlueUploadButton } from "components/BlueUploadButton";
import { RedDeleteButton } from "components/RedDeleteButton";
import { SportsContext } from "context/SportsContext";
import { useBlueUploadButton } from "hooks/blue-upload-button";
import { useRedDeleteButton } from "hooks/red-delete-button";
import moment from "moment";
import { useContext, useState } from "react";

export function AddSportsGame() {

    const { tournaments, teams, showModal, addSportsEvent, deleteSportsEvent } = useContext(SportsContext)
    const { blueButton, setBlueButtonLoading, setBlueButtonDefault } = useBlueUploadButton({defaultText: "Добавить"})
    const { redButton, setRedButtonLoading, setRedButtonDefault } = useRedDeleteButton({defaultText: "Удалить"})

    const [tournamentTitle, setTournamentTitle] = useState<string | null>(null)
    const [team1, setTeam1] = useState<string | null>(null)
    const [team2, setTeam2] = useState<string | null>(null)
    const [team1Points, setTeam1Points] = useState<string | null>(null)
    const [team2Points, setTeam2Points] = useState<string | null>(null)

    return (
        <>
            <div className="new-sports-event">
                <p>Добавить игру</p>
                <Autocomplete
                    freeSolo={true}
                    disablePortal
                    id="combo-box-tournamnets"
                    options={ tournaments.map(tournament => tournament.title) }
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Введите название турнира" />}
                    value={ tournamentTitle ? tournamentTitle : "" }
                    onChange={ (event, newValue) => setTournamentTitle(newValue) }
                />
                <div className="team1">
                    <Autocomplete
                        freeSolo={true}
                        disablePortal
                        id="combo-box-team1"
                        options={ teams!!.map(team => team.title) }
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Команда 1" />}
                        value={ team1 ? team1 : "" }
                        onChange={ (event, newValue) => setTeam1(newValue) }
                    />
                    <TextField
                        type="number"
                        id="points-team1"
                        label="Очки"
                        variant="outlined"
                        value={ team1Points ? team1Points : "" }
                        onChange={(e) => setTeam1Points(e.target.value)}
                    />
                </div>
                <div className="team2">
                    <Autocomplete
                        freeSolo={true}
                        disablePortal
                        id="combo-box-team2"
                        options={ teams!!.map(team => team.title) }
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Команда 2" />}
                        value={ team2 ? team2 : "" }
                        onChange={ (event, newValue) => setTeam2(newValue) }
                    />
                    <TextField
                        type="number"
                        id="points-team2"
                        label="Очки"
                        variant="outlined"
                        value={ team2Points ? team2Points : "" }
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
                    <p>{ blueButton }</p>
                </BlueUploadButton>
                <RedDeleteButton onClick={ () => {
                    deleteSportsEvent(
                        setRedButtonLoading,
                        setRedButtonDefault,
                        showModal,
                        {
                            teamOneName: team1!!, 
                            teamTwoName: team2!!, 
                            teamOnePoints: Number(team1Points), 
                            teamTwoPoints: Number(team2Points), 
                            sportTitle: tournamentTitle!!,
                            date: moment().format("DD/MM/YY")
                        }
                    )
                } }><p>{ redButton }</p></RedDeleteButton>
            </div>
        </>
    )
}