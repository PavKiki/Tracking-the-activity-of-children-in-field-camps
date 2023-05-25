import "css-components/NavigationDropdown.css"

import { useAuth } from "context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import authApi from "api/authApi"

export function NavigationDropdown({setIsPopUpActive}: {setIsPopUpActive: (isPopUpActive: boolean) => void}) {

    const navigate = useNavigate()

    const { setAuth } = useAuth()

    async function handleLogout() {
        await authApi
            .post(
                "auth/logout", 
                {}
            )
            .then(() =>
                {
                    setAuth(false)
                    navigate("/")
                }
            )
            .catch(err => console.error(err))
    }

    return (
        <div className="navigation-dropdown" onMouseLeave={ () => setIsPopUpActive(false) }>
            <Link to="points" style={ {textDecoration: "none", color: "black"} } >
                <div className="element">
                    <p>Поинты</p>
                </div>
            </Link>
            <span/>
            <Link to="day" style={ {textDecoration: "none", color: "black"} } >
                <div className="element">
                    <p>Расписание</p>
                </div>
            </Link>
            <span/>
            <Link to="sports" style={ {textDecoration: "none", color: "black"} } >
                <div className="element">
                    <p>Спорт</p>
                </div>
            </Link>
            <span/>
            <Link to="creativity" style={ {textDecoration: "none", color: "black"} } >
                <div className="element">
                    <p>Творчество</p>
                </div>
            </Link>
            <span/>
            <Link to="teams" style={ {textDecoration: "none", color: "black"} } >
                <div className="element">
                    <p>Команды</p>
                </div>
            </Link>
            <span/>
            <div className="element" onClick={ () => handleLogout() }>
                <p>Выйти</p>
            </div>
        </div>
    )
}