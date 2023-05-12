import "css-components/AddSportsTournamentPage.css";

import { BlueUploadButton } from "components/BlueUploadButton";
import { ModalWindow } from "components/ModalWindow";
import { SportsTournamentToAdd } from "components/add_sports_tournament_page/SportsTournamentToAdd";
import { useBlueUploadButton } from "hooks/blue-upload-button";
import { useModal } from "hooks/modal";
import { useSportsTournaments } from "hooks/tournaments";
import { useState } from "react";
import { GrayAddButton } from "components/GrayAddButton";

export function AddSportsTournamentPage() {
    const [show, setShow] = useState<boolean>(false)

    const { tournaments, loading, error, tournamentTitle, setTournamentTitle, addTournament } = useSportsTournaments()
    const { button, setBlueButtonLoading, setBlueButtonDefault } = useBlueUploadButton({defaultText: "Добавить"})
    const { modal, showModal } = useModal()

    return (
        <>
            <ModalWindow modal={modal}/>
            { loading && <div>Loading...</div>}
            { error && <div>{ error }</div>}
            { tournaments &&
                <div className="existing-tournaments-container">
                    <p>Спортивные турниры:</p>
                    { tournaments.map((tournament, i) => <div className="tournament" key={ i }><p>{ tournament.title }</p></div> ) }
                    <br/>
                </div>
            }
            <div className="new-sports-tournament">
                {!show ?
                    <GrayAddButton onClick={ () => setShow(true) }><p>Добавить турнир</p></GrayAddButton>
                    :
                    <SportsTournamentToAdd setTournamentTitle={ setTournamentTitle } tournamentTitle={ tournamentTitle }></SportsTournamentToAdd>
                }
            </div>
            { show && <BlueUploadButton onClick={ () => addTournament(setBlueButtonLoading, setBlueButtonDefault, showModal) }><p>{ button }</p></BlueUploadButton> }
        </>
    );
}