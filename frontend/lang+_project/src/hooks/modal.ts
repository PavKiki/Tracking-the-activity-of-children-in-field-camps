import { IModal } from "models"
import { useState } from "react"

export function useModal() {    
    const [modal, setModal] = useState<IModal | null>(null)

    function showModal(text: string, isError: boolean) {
        setModal(
            {
                text: text, 
                style: { 
                    backgroundColor: isError ? "#ffd8d8" : "#e0ffd8" 
                }
            }
        )
        setTimeout(() => {
            setModal(null)
        }, 7000)
    }

    return { showModal, modal }
}