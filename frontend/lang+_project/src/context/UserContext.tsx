import { IUserInfo } from "models";
import { createContext, useEffect, useState } from "react";

interface IUserContext {
    userInfo: IUserInfo | undefined;
    isAuthorized: boolean;
    setUserInfo: (userInfo: IUserInfo) => void;
    setIsAuthorized: (isAuthorized: boolean) => void;
}

export const UserContext = createContext<IUserContext>({
    userInfo: { name: "", surname: "", username: "", email: "" },
    isAuthorized: false,
    setUserInfo: (userInfo: IUserInfo) => {},
    setIsAuthorized: (isAuthorized: boolean) => {}
})

export const UserContextProvider = ({children}: {children: React.ReactNode}) => {
    const [userInfo, setUserInfo] = useState<IUserInfo>()
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false)

    useEffect(() => {
        const authorizedUser = localStorage.getItem("userInfo")
        if (authorizedUser) {
            const user = JSON.parse(authorizedUser)

            setUserInfo(user)
            setIsAuthorized(true)
        }
    }, [])
    
    const value = {
        userInfo,
        isAuthorized,
        setUserInfo,
        setIsAuthorized
    }

    return (
        <UserContext.Provider value = { value }> { children } </UserContext.Provider>
    )
}