import { GrayAddButton } from "components/GrayAddButton"
import { useBlueUploadButton } from "hooks/blue-upload-button"
import { useContext, useState } from "react"
import { SportsTournamentToAdd } from "./SportsTournamentToAdd"
import { BlueUploadButton } from "components/BlueUploadButton"
import { AddSportsContext } from "context/AddSportsContext"

export function SportsTournaments() {
    const [show, setShow] = useState<boolean>(false)
    const { button, setBlueButtonLoading, setBlueButtonDefault } = useBlueUploadButton({defaultText: "Добавить"})
    const { tournaments, tournamentTitle, setTournamentTitle, addTournament, showModal } = useContext(AddSportsContext)
    
    return (
        <>
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
                { show && <BlueUploadButton onClick={ () => addTournament(setBlueButtonLoading, setBlueButtonDefault, showModal) }><p>{ button }</p></BlueUploadButton> }
            </div>
        </>
    )
}