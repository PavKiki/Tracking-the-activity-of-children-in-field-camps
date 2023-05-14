import { useState } from "react"

export function useRedDeleteButton({defaultText} : {defaultText: string}) {
    const [redButton, setRedButton] = useState<string>(defaultText)

    function setRedButtonLoading() {
        setRedButton("Loading...")
    }
    
    function setRedButtonDefault() {
        setRedButton(defaultText)
    }

    return { redButton, setRedButtonLoading, setRedButtonDefault }
}