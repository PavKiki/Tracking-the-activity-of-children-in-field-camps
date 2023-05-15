import "css-components/PointsPage.css";

import { ModalWindow } from "components/ModalWindow";
import { AddPoints } from "components/points_page/AddPoints";
import { useModal } from "hooks/modal";

export function PointsPage() {
    
    const { modal, showModal } = useModal()

    return (
        <>
            <ModalWindow modal={ modal }/>
            <div className="points-container">
                <AddPoints showModal={ showModal }/>
                <div id="animation"></div>
            </div>
        </>
    )
}