import "css-components/CreativityPage.css";

import { ModalWindow } from "components/ModalWindow";
import { AddCreativity } from "components/creativity_page/AddCreativity";
import { CreativityEvents } from "components/creativity_page/CreativityEvents";
import { useContext } from "react";
import { CreativityContext } from "context/CreativityContext";

export function CreativityPage() {
    const { 
        modal,
        creativeEvents, 
        teams, 
        places 
    } = useContext(CreativityContext)

    return (
        <>
            <ModalWindow modal={modal}/>
            {creativeEvents && teams && places && 
                <div className="creativity-container">
                    <CreativityEvents/>
                    <AddCreativity/>
                </div>
            }
        </>
    );
}