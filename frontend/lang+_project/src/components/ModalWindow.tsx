import { IModal } from "models";
import "css-components/ModalWindow.css"

export function ModalWindow({modal}: {modal: IModal | null}) {
    return (
        <>
            {modal && 
                <div className='modal' style={ modal.style }>
                        <p>{ modal.text }</p>
                </div>
            }
        </>
    )
}