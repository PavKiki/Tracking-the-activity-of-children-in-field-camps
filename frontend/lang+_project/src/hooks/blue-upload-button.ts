import { useState } from "react"

export function useBlueUploadButton({defaultText} : {defaultText: string}) {
    const [blueButton, setBlueButton] = useState<string>(defaultText)

    function setBlueButtonLoading() {
        setBlueButton("Loading...")
    }
    
    function setBlueButtonDefault() {
        setBlueButton(defaultText)
    }

    return { blueButton, setBlueButtonLoading, setBlueButtonDefault }
}