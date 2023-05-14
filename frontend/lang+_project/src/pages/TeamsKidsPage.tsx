import "css-components/TeamsKidsPage.css"
import { AddDeleteTeam } from "components/teams_kids_page/AddDeleteTeam";
import { useModal } from "hooks/modal";
import { ModalWindow } from "components/ModalWindow";

export function TeamsKidsPage() {
    const { modal, showModal } = useModal()

    return (
        <>
            <ModalWindow modal={ modal }></ModalWindow>
            <AddDeleteTeam showModal={ showModal }/>
        </>
    )
}