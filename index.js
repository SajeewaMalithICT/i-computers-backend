import express from "express"
import mongoose from "mongoose"
import userRouter from "./routes/userRouter.js"
import jwt from "jsonwebtoken"
import productRouter from "./routes/productRouter.js"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

const mongoURI = process.env.MONGO_URL
//const mongoURI = "mongodb://admin:1234@ac-p7xp3kh-shard-00-00.xx4zkl0.mongodb.net:27017,ac-p7xp3kh-shard-00-01.xx4zkl0.mongodb.net:27017,ac-p7xp3kh-shard-00-02.xx4zkl0.mongodb.net:27017/?ssl=true&replicaSet=atlas-ytyqfm-shard-0&authSource=admin&appName=Cluster0"
mongoose.connect(mongoURI).then(
    ()=>{
        console.log("Connected to MonoDB Cluster")
    }
)

const app = express()

app.use(cors())

app.use(express.json())

app.use(
    (req,res,next)=>{

        const authorizationHeader = req.header("Authorization")

        if(authorizationHeader != null){
            const token = authorizationHeader.replace("Bearer ", "")
            console.log(token)

            jwt.verify(token, process.env.jwt_secret,
                (error, content)=>{

                    if(content == null){
                           console.log("invalid token")
                           res.json({
                            message : "invalid token"
                           })
                        
                    }else{
                     // console.log(content)
                      req.user = content
                      next()
                    }
                   
                }
            )
        }else{
            next()
        }

    
           
    }
)


app.use("/api/users",userRouter)
app.use("/api/products",productRouter)



app.listen(5000 , 
    () => {
        console.log("Server is running")
    }
)