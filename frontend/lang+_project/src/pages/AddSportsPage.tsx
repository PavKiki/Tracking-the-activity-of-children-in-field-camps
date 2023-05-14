import "css-components/AddSportsPage.css";

import { ModalWindow } from "components/ModalWindow";
import { useContext } from "react";
import { SportsTournaments } from "components/add_sports_tournament_page/SportsTournaments";
import { AddSportsContext } from "context/AddSportsContext";
import { AddSportsGame } from "components/add_sports_tournament_page/AddSportsGame";

export function AddSportsPage() {

    const { modal, loadingTournaments, errorTournaments, tournaments, teams } = useContext(AddSportsContext)

    return (
        <>
            { loadingTournaments && <div>Loading...</div>}
            { errorTournaments && <div>{ errorTournaments }</div>}
            <ModalWindow modal={modal}/>
            {tournaments && teams && 
                <div className="sports-container">
                    <SportsTournaments/>
                    <AddSportsGame/>
                </div>
            }
        </>
    );
}