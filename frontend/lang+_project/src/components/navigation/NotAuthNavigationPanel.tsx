import 'css-components/NavigationPanel.css'
import langLogo from 'data/images/logo_language.png'
import signInLogo from 'data/images/login.svg'
import { Link } from 'react-router-dom'

export function NotAuthNavigationPanel() {
    const SIGN_IN: string = "Войти"

    return (
        <nav className="navigation-panel">
            <Link to="/">
                <div className="navigation-panel-logo">
                    <img src={langLogo} alt="logo"></img>
                </div>
            </Link>
            <Link style={{textDecoration: 'none'}} to="/login">
                <div className="navigation-panel-account-info">
                    <p>{ SIGN_IN }</p>
                    <img src={ signInLogo } alt="icon"></img>
                </div>
            </Link>
        </nav>
    );
}