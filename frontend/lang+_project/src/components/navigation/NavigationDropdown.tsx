import api from "api/axios"
import { useAuth } from "context/AuthContext"
import "css-components/NavigationDropdown.css"
import { Link, useNavigate } from "react-router-dom"

export function NavigationDropdown({setIsPopUpActive}: {setIsPopUpActive: (isPopUpActive: boolean) => void}) {

    const navigate = useNavigate()

    const { setAuth } = useAuth()

    async function handleLogout() {
        await api
            .post(
                "auth/logout", 
                {},
                { withCredentials: true }
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
            <Link to="add-day" style={ {textDecoration: "none"} } >
                <div className="element">
                    <p>Расписание</p>
                </div>
            </Link>
            <span/>
            <Link to="add-sports" style={ {textDecoration: "none"} } >
                <div className="element">
                    <p>Спорт</p>
                </div>
            </Link>
            <span/>
            <div className="element" onClick={ () => handleLogout() }>
                <p>Выйти</p>
            </div>
        </div>
    )
}