import "css-components/SportsPage.css";

import { ModalWindow } from "components/ModalWindow";
import { useContext } from "react";
import { SportsTournaments } from "components/sports_page/SportsTournaments";
import { SportsContext } from "context/SportsContext";
import { AddSportsGame } from "components/sports_page/AddSportsGame";

export function SportsPage() {

    const { modal, loadingTournaments, errorTournaments, tournaments, teams } = useContext(SportsContext)

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