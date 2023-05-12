import { BlueAddButton } from "components/BlueAddButton";
import { ModalWindow } from "components/ModalWindow";
import { SportsTournamentToAdd } from "components/add_sports_tournament_page/SportsTournamentToAdd";
import { useBlueAddButton } from "hooks/blue-add-button";
import { useModal } from "hooks/modal";
import { useSportsTournaments } from "hooks/tournaments";

import "css-components/AddSportsTournamentPage.css";

export function AddSportsTournamentPage() {
    const { tournaments, loading, error, tournamentTitle, setTournamentTitle, addTournament } = useSportsTournaments()
    const { button, setBlueButtonLoading, setBlueButtonDefault } = useBlueAddButton({defaultText: "Добавить"})
    const { modal, showModal } = useModal()

    return (
        <>
            <ModalWindow modal={modal}/>
            { loading && <div>Loading...</div>}
            { error && <div>{ error }</div>}
            { tournaments &&
                <div className="existing-tournaments-container">
                    <h2>Турниры:</h2>
                    { tournaments.map((tournament, i) => <div className="tournament" key={ i }>{ tournament.title }</div> ) }
                    <br/>
                </div>
            }
            <SportsTournamentToAdd tournamentTitle={tournamentTitle} setTournamentTitle={setTournamentTitle}/>
            <BlueAddButton onClick={ () => addTournament(setBlueButtonLoading, setBlueButtonDefault, showModal) }>
                <p>{ button }</p>
            </BlueAddButton>
        </>
    );
}