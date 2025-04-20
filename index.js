const exprress=require("express")
const mongoose=require("mongoose")
const bodyParser=require("body-parser")
const taskRouter=require("./src/routes/taskRoute")
const sprintRouter = require("./src/routes/sprintRoutes")
const backlogRouter = require("./src/routes/backlogRoutes")
require("dotenv").config()

const port=process.env.PORT
const mongoURL=`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@localhost:27017`

const expApp=exprress()

expApp.use(exprress.json())

expApp.use("/",taskRouter)
expApp.use("/",sprintRouter)
expApp.use("/",backlogRouter)

mongoose.connect(`${mongoURL}`).

then(()=>console.log("Conexion exitosa con la base de datos mongo")).

catch((error)=>console.log("Hubo un error durante la conexion: ",error.message))


expApp.listen(port,()=>{
    console.log("Escuchando el puerto: ",port)
})




