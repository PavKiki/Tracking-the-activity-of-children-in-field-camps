import "css-components/TeamsKidsPage.css"
import { AddDeleteTeam } from "components/teams_kids_page/AddDeleteTeam";
import { useModal } from "hooks/modal";
import { ModalWindow } from "components/ModalWindow";
import { useTeam } from "hooks/teams";
import { AddDeleteKids } from "components/teams_kids_page/AddDeleteKids";

export function TeamsKidsPage() {
    const { modal, showModal } = useModal()
    const { teams, refresh, setRefresh } = useTeam()

    return (
        <>
            {teams &&
            <div>
                <ModalWindow modal={ modal }></ModalWindow>
                <AddDeleteTeam showModal={ showModal } teams={ teams } refresh={ refresh } setRefresh={ setRefresh }/>
                <AddDeleteKids showModal={ showModal } teams={ teams }/>
            </div>
            }
        </>
    )
}