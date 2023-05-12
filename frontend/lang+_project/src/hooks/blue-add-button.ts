import { useState } from "react"

export function useBlueAddButton({defaultText} : {defaultText: string}) {
    const [button, setButton] = useState<string>(defaultText)

    function setBlueButtonLoading() {
        setButton("Loading...")
    }
    
    function setBlueButtonDefault() {
        setButton(defaultText)
    }

    return { button, setBlueButtonLoading, setBlueButtonDefault }
}