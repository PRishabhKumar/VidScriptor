import React from "react"
import axios from "axios"
import httpStatus from "http-status"
import { Children, createContext, useState } from "react"
import {useNavigate} from "react-router-dom"
import server from "../environment.js"


export const AuthContext = createContext({})
const client = axios.create({
    baseURL: `${server}/api/v1/users`
})

export const AuthProvider = ({children})=>{
    const [userData, setUserData] = useState(null)
    const router = useNavigate()
    const handleRegister = async(username, password, name, email)=>{
        try{
            const request = await client.post("/register", {
                username,
                password,
                name,
                email
            })
            if(request.status === httpStatus.CREATED){
                localStorage.setItem("token", request.data.token)
                localStorage.setItem("username", request.data.username)
                setTimeout(()=>{
                    router("/home")
                }, 2000)
                return (request.data.message || "User registered successfully..")
            }
        }
        catch(error){
            console.log('This error occured in registering the user : ', error)
            throw error
        }
    }
    const handleLogin = async (username, password)=>{
        try{
            let request = await client.post("/login", {
                username, 
                password
            })
            if(request.status == httpStatus.OK){
                localStorage.setItem("token", request.data.token)
                localStorage.setItem("username", request.data.username)
                setTimeout(()=>{
                    router("/home")
                }, 2000)
            }
        }
        catch(error){
            console.log("This error occured in authenticating the user : ", error)
            throw error
        }
    }
    const handleLogout = async ()=>{
        setUserData(null)
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        console.log("User logged out successfully...")
        router("/")
    }
    const data = {
        userData,
        setUserData,
        handleRegister,
        handleLogin,
        handleLogout
    };
    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}
export default AuthContext;