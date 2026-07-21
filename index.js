import express from "express"
import mongoose from "mongoose"
import userRouter from "./routes/userRouter.js"
import jwt from "jsonwebtoken"
import productRouter from "./routes/productRouter.js"

const mongoURI = "mongodb://admin:1234@ac-p7xp3kh-shard-00-00.xx4zkl0.mongodb.net:27017,ac-p7xp3kh-shard-00-01.xx4zkl0.mongodb.net:27017,ac-p7xp3kh-shard-00-02.xx4zkl0.mongodb.net:27017/?ssl=true&replicaSet=atlas-ytyqfm-shard-0&authSource=admin&appName=Cluster0"
mongoose.connect(mongoURI).then(
    ()=>{
        console.log("Connected to MonoDB Cluster")
    }
)

const app = express()

app.use(express.json())

app.use(
    (req,res,next)=>{

        const authorizationHeader = req.header("Authorization")

        if(authorizationHeader != null){
            const token = authorizationHeader.replace("Bearer ", "")
            console.log(token)

            jwt.verify(token,"secretkey96$2025",
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

    
           
    })


app.use("/users",userRouter)
app.use("/products",productRouter)



app.get("/",
    (req, res)=>{
   
        Student.find().then(
            (students)=>{
                res.json(students)
            }
        
        )
    }
)

app.post("/" ,
    (req, res)=>{
    
        // Read the data inside the request.
        console.log(req.body)

        const student = new Student(req.body)
        student.save().then(
            ()=>{
                res.json({
                    message : "Student created successfully"
                })
            }
        )
        // Create and Student in the student collection

        

})

app.delete("/" , 
    (req, res)=>{

     res.json({
        message : "Goodbye" + req.body.name
    })

})

app.put("/" , 
    (req, res)=>{

     res.json({
        message : "See You again " + req.body.name
    })

})

function abc(){
    console.log("Server is running")
}

app.listen(5000 , 
    () => {
        console.log("Server is running")
    }
)