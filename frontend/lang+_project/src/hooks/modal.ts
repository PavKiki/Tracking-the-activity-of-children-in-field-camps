import { IModal } from "models"
import { useState } from "react"

export function useModal() {    
    const [modal, setModal] = useState<IModal | null>(null)

    function showModal(text: string, isError: boolean) {
        setModal(
            {
                text: text, 
                style: { 
                    border: isError ? "dashed red 10px" : "dashed green 10px" 
                }
            }
        )
        setTimeout(() => {
            setModal(null)
        }, 5000)
    }

    return { showModal, modal }
}