import "css-components/AddSportsPage.css";

import { BlueUploadButton } from "components/BlueUploadButton";
import { ModalWindow } from "components/ModalWindow";
import { SportsTournamentToAdd } from "components/add_sports_tournament_page/SportsTournamentToAdd";
import { useBlueUploadButton } from "hooks/blue-upload-button";
import { useModal } from "hooks/modal";
import { useSportsTournaments } from "hooks/tournaments";
import { useState } from "react";
import { GrayAddButton } from "components/GrayAddButton";
import { Autocomplete, TextField } from "@mui/material";
import { useTeam } from "hooks/teams";

export function AddSportsPage() {
    const [show, setShow] = useState<boolean>(false)

    const { teams } = useTeam()
    const { tournaments, loading, error, tournamentTitle, setTournamentTitle, addTournament } = useSportsTournaments()
    const { button, setBlueButtonLoading, setBlueButtonDefault } = useBlueUploadButton({defaultText: "Добавить"})
    const { modal, showModal } = useModal()


    const tournamentOptions = tournaments.map(tournament => tournament.title)
    const teamOptions = teams!!.map(team => team.title)

    return (
        <>
            <ModalWindow modal={modal}/>
            { loading && <div>Loading...</div>}
            { error && <div>{ error }</div>}
            <div className="sports-container">
                { tournaments &&
                    <div className="existing-tournaments-container">
                        <p>Спортивные турниры:</p>
                        { tournaments.map((tournament, i) => <div className="tournament" key={ i }><p>{ tournament.title }</p></div> ) }
                        <br/>
                        <div className="new-sports-tournament">
                        {!show ?
                            <GrayAddButton onClick={ () => setShow(true) }><p>Добавить турнир</p></GrayAddButton>
                            :
                            <SportsTournamentToAdd setTournamentTitle={ setTournamentTitle } tournamentTitle={ tournamentTitle }></SportsTournamentToAdd>
                        }
                        </div>
                    </div>
                }
                <div className="new-sports-event">
                    <p>Добавить игру</p>
                    <Autocomplete
                        disablePortal
                        id="combo-box-tournamnets"
                        options={ tournamentOptions }
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Введите название турнира" />}
                    />
                    <div className="team1">
                        <Autocomplete
                            disablePortal
                            id="combo-box-team1"
                            options={ teamOptions }
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Команда 1" />}
                        />
                    </div>
                    <div className="team2">
                        <Autocomplete
                            disablePortal
                            id="combo-box-team2"
                            options={ teamOptions }
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Команда 2" />}
                        />
                    </div>  
                </div>
            </div>
            { show && <BlueUploadButton onClick={ () => addTournament(setBlueButtonLoading, setBlueButtonDefault, showModal) }><p>{ button }</p></BlueUploadButton> }
        </>
    );
}