import React from "react"
import "./Styles/AuthStyle.css"
import { useState } from "react"
import {useNavigate} from "react-router-dom"
import httpStatus from "http-status"
import { useRef } from "react"
import AuthContext from "../../Contexts/AuthContext.jsx"
import { useContext } from "react"


function Auth() {
    const router = useNavigate()
    const containerRef = useRef(null)
    const [formState, setFormState] = useState(1)  // 1 for register and 0 for login
    const [showPassword, setShowPassword] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const handleSubmit = async()=>{
        await handleAuthentication();
        console.log("Form submitted successfully : ", {
            username,
            password,
            name,
            email,
        })
    }
    const {handleLogin, handleRegister} = useContext(AuthContext)

    const handleAuthentication = async ()=>{
        try{
            // login
            if(formState == 0){
                let result = await handleLogin(username, password)
                setMessage('Authentication successful...')
                setError("")
                setUsername(username)
                setPassword(password)
            }
            else{
                let result = handleRegister(username, password, name, email)
                setMessage("User registered successfully !!!")
                setError("")
                setUsername(username)
                setPassword(password)
                setName(name)
                setEmail(email)
                setTimeout(()=>{
                    router("/home")
                }, 2000)
            }
        }
        catch(error){
            if(error && error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message)
            }
            else{
                setError('Something went wrong')
            }
            setMessage("")
        }
    }

    return ( 
        <>
            <div className="authContainer">
                <div className="authFormContainer">
                    {
                        formState && (
                            <>
                                <div className="nameContainer">
                                    <input onChange={(e)=>{
                                        setName(e.target.value)
                                    }} type="text" className="name" id="name" placeholder="Enter your full name"/>
                                </div>
                                <div onChange={(e)=>{
                                    setEmail(e.target.value)
                                }} className="emailContainer">
                                    <input type="text" className="email" id="email" placeholder="Enter your Email ID" />
                                </div>
                            </>
                        )
                    }
                    <div className="usernameContainer">
                        <input onChange={(e)=>{
                            setUsername(e.target.value)
                        }} type="text" className="username" id="username" placeholder="Select a username for your account" />
                    </div>
                    <div className="passwordContainer">
                        <input onChange={(e)=>{
                            setPassword(e.target.value)
                        }} type={showPassword ? "text" : "password"} className="password" id="password" placeholder="Set your password for this account"/>
                    </div>   
                    <button onClick={handleSubmit} type="submit">{formState ? 'Create Account' : 'Login'}</button>
                </div>
            </div>
        </>
    );
}

export default Auth;