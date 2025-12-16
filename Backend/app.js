import express from "express"
import path from "path"
import cors from "cors"
import mongoose from "mongoose"
import userRoutes from "./Routes/userRoutes.js"
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.set("port", process.env.PORT || 3000);

app.use("/api/v1/users", userRoutes)

const startServer = async()=>{
    try{
        const connection = mongoose.connect(process.env.CLOUD_DB_CONNECTION_STRING)
        console.log("Connected with the cluster successfully.....")
        app.listen(app.get("port"), ()=>{
            console.log("Server is active and is listening for requests on port ", app.get("port"))
        })
    }
    catch(error){
        console.log("This error occured in connecting with the database or starting the server : ", error)
    }
}

// basic index route

app.get("/", (req, res)=>{
    console.log('This is the index route...')
    res.send("This is the index route")
})

startServer()