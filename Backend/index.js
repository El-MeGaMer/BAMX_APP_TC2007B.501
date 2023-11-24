import express from 'express'
import router from "./routes/index.js"
import { sendNotifMail } from './controllers/mails_controller.js'
import initScheduledJobs from "./controllers/scheduledActions/cronjobs.js"
import os from 'os'

const app = express()
const PORT = 3000
const interfaces = os.networkInterfaces()

let HOST = ''
Object.keys(interfaces).forEach((key) => {
    interfaces[key].forEach((details) => {
        if (details.family === 'IPv4' && !details.internal) {
            HOST = details.address;
        }
    });
})

app.use(express.json())
app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(router)
initScheduledJobs()


app.listen(PORT, HOST, ()=>{
    console.log(`Server ready at port ${HOST}:${PORT}`)
})
