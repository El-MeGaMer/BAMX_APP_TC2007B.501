import express from 'express'
import bodyParser from 'body-parser'
import router from "./routes/index.js"
import { sendNotifMail } from './controllers/mails_controller.js'

const app = express()
const PORT = 3000

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(router)

sendNotifMail()

app.listen(PORT, ()=>{
    console.log(`Server ready at port ${PORT}`)
})