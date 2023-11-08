import express from 'express'
import bodyParser from 'body-parser'
import router from "./routes/index.js"
import initScheduledJobs from "./middlewares/scheduledFunctions.js"

const app = express()

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(router)
initScheduledJobs()

app.listen(3000, ()=>{
    console.log('Server ready at: http://localhost:3000')
})