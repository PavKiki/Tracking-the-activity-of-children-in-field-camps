import { ILogin, IUserInfo } from "models";
import { createContext, useContext, useEffect, useState } from "react";
import api from "api/axios";

interface IUserContext {
    userInfo: IUserInfo | null;
    auth: boolean | null;
    setAuth: (auth: boolean) => void;
}

export const UserContext = createContext<IUserContext>({
    userInfo: null,
    auth: null,
    setAuth: (auth: boolean | null) => {},
})

export const useAuth = () => useContext(UserContext)

export const UserContextProvider = ({children}: {children: React.ReactNode}) => {
    const [auth, setAuth] = useState<boolean | null>( () => {
        const isAuth = localStorage.getItem("auth")
        return isAuth ? true : false 
    })
    const [userInfo, setUserInfo] = useState<IUserInfo | null>(null)

    useEffect(() => {
        isAuth()
    }, [auth])

    async function isAuth() {
        await api.get(
            "auth/user",
            {
                withCredentials: true
            } 
        )
        .then (response => {
            setUserInfo(response.data)
            localStorage.setItem("auth", "true")
        })
        .catch (error => {
            console.error(error)
            localStorage.removeItem("auth")
        })
    }

    const value = {
        userInfo,
        auth,
        setAuth
    }

    return (
        <UserContext.Provider value = { value }> { children } </UserContext.Provider>
    )
}