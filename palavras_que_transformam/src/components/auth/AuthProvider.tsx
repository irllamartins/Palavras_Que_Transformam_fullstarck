import { useEffect, useState } from "react"
import { User } from "../../store/application/model/user"
import { AuthContext } from "./AuthContext"
import { authSevice } from "../../service/auth"
import React from 'react';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/duck";
import { authenticationFailure, authenticationSuccess } from "../../store/duck/users";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)

    const auth = authSevice()
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        validateToken()
    }, [])

    const validateToken = async () => {
        const storageData = localStorage.getItem('authToken')
        if (storageData) {
            const data = await auth.validateToken(storageData)
            if (data.user) {
                setUser(data.user)
            }
        }
    }
    const signin = async (email: string, password: string) => {
        const data = await auth.signin(email, password)
        if (data.user && data.token) {
            setUser(data.user)
            setToken(data.token)
            dispatch(authenticationSuccess({ user: data.user }))
            return true
        }
        dispatch(authenticationFailure())
        return false
    }
    const signout = async () => {
        await auth.logout()
        setUser(null)
        setToken('')
    }
    const setToken = (token: string) => {
        localStorage.setItem('authToken', token)
    }
    return (
        <AuthContext.Provider value={{ user, signin, signout }}>
            {children}
        </AuthContext.Provider>
    )
}