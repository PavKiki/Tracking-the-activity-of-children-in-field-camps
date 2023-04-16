import '../../css-components/NavigationPanel.css'
import langLogo from '../../data/images/logo_language.png'
import signInLogo from '../../data/images/login.svg'
import userLogo from '../../data/images/person.svg'
import { useState } from 'react'

export function NavigationPanel() {
    const SIGN_IN: string = "Войти"
    const USERNAME: string = "username"

    const [isSignedIn, setIsSignedIn] = useState(false)
    const [logo, setLogo] = useState(signInLogo)
    const [caption, setCaption] = useState(SIGN_IN)

    function changeState() {
        if (isSignedIn) {
            setIsSignedIn(false)
            setLogo(signInLogo)
            setCaption(SIGN_IN)
        }
        else {
            setIsSignedIn(true)
            setLogo(userLogo)
            setCaption(USERNAME)
        }
    }

    return (
    <div className="navigation-panel">
        <div className="navigation-panel-logo">
            <img src={langLogo} alt="logo"></img>
        </div>
        <div className="navigation-panel-account-info" onClick={ () => { changeState() } }>
            <p>{ caption }</p>
            <img src={ logo } alt="icon"></img>
        </div>
    </div>
    );
}