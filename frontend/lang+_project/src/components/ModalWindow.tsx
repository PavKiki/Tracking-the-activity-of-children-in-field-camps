import "css-components/ModalWindow.css"

import { IModal } from "models";

export function ModalWindow({modal}: {modal: IModal | null}) {
    return (
        <>
            {modal && 
                <div className='modal' style={ modal.style }>
                        <img src={ modal.image } alt="icon of snackbar"/>
                        <p>{ modal.text }</p>
                </div>
            }
        </>
    )
}