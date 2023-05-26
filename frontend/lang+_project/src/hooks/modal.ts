import success from "data/images/done_FILL0_wght400_GRAD0_opsz48.svg"
import errorImg from "data/images/error_FILL0_wght400_GRAD0_opsz48.svg"

import { IModal } from "models"
import { useState } from "react"

export function useModal() {    
    const [modal, setModal] = useState<IModal | null>(null)

    function showModal(text: string, isError: boolean) {
        setModal(
            {
                text: text, 
                style: { 
                    backgroundColor: isError ? "#ff4949" : "#497cff" 
                },
                image: isError ? errorImg : success
            }
        )
        setTimeout(() => {
            setModal(null)
        }, 5000)
    }

    return { showModal, modal }
}