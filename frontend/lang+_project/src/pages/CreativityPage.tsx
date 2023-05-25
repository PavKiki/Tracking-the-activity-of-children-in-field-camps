import { ModalWindow } from "components/ModalWindow";
import { AddCreativity } from "components/creativity_page/AddCreativity";
import { CreativityEvents } from "components/creativity_page/CreativityEvents";

export function CreativityPage() {
    const { modal, loadingTournaments, errorTournaments, tournaments, teams } = useContext(SportsContext)

    return (
        <>
            { loadingTournaments && <div>Loading...</div>}
            { errorTournaments && <div>{ errorTournaments }</div>}
            <ModalWindow modal={modal}/>
            {tournaments && teams && 
                <div className="sports-container">
                    <CreativityEvents/>
                    <AddCreativity/>
                </div>
            }
        </>
    );
}