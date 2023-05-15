import 'css-components/NavigationPanel.css'
import langLogo from 'data/images/logo_language.png'
import signInLogo from 'data/images/login.svg'
import { Link, useLocation } from 'react-router-dom'

export function NotAuthNavigationPanel() {
    const SIGN_IN: string = "Войти"

    const showSignInButton = (location: string) => {
        if (location === "/register" || location === "/login") return false
        else return true
    }

    return (
        <nav className="navigation-panel">
            <Link to="/">
                <div className="navigation-panel-logo">
                    <img src={langLogo} alt="logo"></img>
                </div>
            </Link>
            {showSignInButton(useLocation().pathname) &&
            <div className='right-part-navigation'>
                <Link to="/teamsshow" style={{ textDecoration: "none" }}>
                    <div className="nav-item">
                        <p>Команды</p>
                    </div>
                </Link>
                <Link to="/grid" style={{ textDecoration: "none" }}>
                    <div className="nav-item">
                        <p>Спорт</p>
                    </div>
                </Link>
                <Link style={{textDecoration: 'none'}} to="/login">
                    <div className="navigation-panel-account-info">
                        <p>{ SIGN_IN }</p>
                        <img src={ signInLogo } alt="icon"></img>
                    </div>
                </Link>
            </div>
            }
        </nav>
    );
}