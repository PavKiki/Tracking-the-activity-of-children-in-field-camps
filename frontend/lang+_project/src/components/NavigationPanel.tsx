import '../css-components/NavigationPanel.css'
import langLogo from '../data/images/logo_language.png'
import signInLogo from '../data/images/login.svg'
import userLogo from '../data/images/person.svg'

export function NavigationPanel() {
    return (
    <div className="navigation-panel">
        <div className="navigation-panel-logo">
            <img src={langLogo} alt="logo"></img>
        </div>
        <div className="navigation-panel-account-info">
            <p>Войти</p>
            <img src={signInLogo} alt="sign in icon"></img>
        </div>
    </div>
    );
}