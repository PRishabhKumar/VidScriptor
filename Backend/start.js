import dotenv from "dotenv"
import path from "path"

dotenv.config({path: path.resolve("../.env")})

await import("./app.js")