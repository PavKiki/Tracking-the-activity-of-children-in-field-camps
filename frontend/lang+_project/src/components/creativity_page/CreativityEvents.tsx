import closeIcon from "data/images/cancel_FILL0_wght400_GRAD0_opsz48.svg"

import { CreativityContext } from "context/CreativityContext"
import { useBlueUploadButton } from "hooks/blue-upload-button"
import { useState, useContext } from "react"
import { GrayAddButton } from "components/GrayAddButton"
import { BlueUploadButton } from "components/BlueUploadButton"
import { CreativeEventToAdd } from "./CreativeEventToAdd"

export function CreativityEvents() {
    const [show, setShow] = useState<boolean>(false)
    const { blueButton, setBlueButtonLoading, setBlueButtonDefault } = useBlueUploadButton({defaultText: "Добавить"})
    const { creativeEvents, creativeEventTitle, setCreativeEventTitle, addEvent, showModal, deleteEvents } = useContext(CreativityContext)

    return (
        <>
            <div className="existing-tournaments-container">
                <p>Творческие мероприятия:</p>
                { creativeEvents.map((creativeEvent, i) => {
                    return (
                        <div className="tournament" key={ i }>
                            <p>{ creativeEvent.title }</p>
                            <img src={ closeIcon } onClick={ () => {
                                deleteEvents(showModal, creativeEvent.title)
                            } }/>
                        </div>
                    )
                }) }
                <br/>
                <div className="new-sports-tournament">
                {!show ?
                    <GrayAddButton onClick={ () => setShow(true) }><p>Добавить мероприятие</p></GrayAddButton>
                    :
                    <CreativeEventToAdd setEventTitle={ setCreativeEventTitle } eventTitle={ creativeEventTitle }></CreativeEventToAdd>
                }
                </div>
                { show && <BlueUploadButton onClick={ () => addEvent(setBlueButtonLoading, setBlueButtonDefault, showModal, setShow) }><p>{ blueButton }</p></BlueUploadButton> }
            </div>
        </>
    )
}