import { createContext } from "react";
import { useAuth } from "../hooks/useAuth";

export const Context = createContext()


// eslint-disable-next-line react/prop-types
export const UserProvider = ({children}) => {
    const { register, authenticated, logout, login } = useAuth()
    return (
        <Context.Provider value={{register, authenticated, logout, login}}>
            {children}
        </Context.Provider>
    )

}