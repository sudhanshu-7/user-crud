const express  = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
const cors = require("cors")

dotenv.config()

const routes = require("./handlers/routes")
const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use("/api",routes)


app.use((err, req,res,next)=>{
    if(res.headerSent){
        return next(err);
    }
    res.status(400).json({
        message:"Something Went Wrong!",
        error: err
    })
})
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.cnm4a.mongodb.net/Event?retryWrites=true&w=majority`,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{ 
    app.listen(process.env.PORT ||  5000,()=>console.log("Console Working"))
}).catch(err=>{
    console.log(err);
})
