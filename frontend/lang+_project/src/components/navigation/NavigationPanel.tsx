import 'css-components/NavigationPanel.css'
import langLogo from 'data/images/logo_language.png'
import userLogo from 'data/images/person.svg'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from 'context/AuthContext'
import { NavigationPopUp } from "components/navigation/NavigationPopUp"

export function NavigationPanel() {
    const [isPopUpActive, setIsPopUpActive] = useState<boolean>(false)

    const { userInfo } = useContext(UserContext)

    return (
        <nav className="navigation-panel">
            <Link to="/">
                <div className="navigation-panel-logo">
                    <img src={langLogo} alt="logo"></img>
                </div>
            </Link>
            <div className="navigation-panel-account-info" onClick={ () => { setIsPopUpActive(true) } }>
                <p>{ userInfo?.username }</p>
                <img src={ userLogo } alt="icon"></img>
                { isPopUpActive && <NavigationPopUp/> }
            </div>
        </nav>
    );
}