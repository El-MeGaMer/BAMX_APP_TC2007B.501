import express from 'express'
import bodyParser from 'body-parser'
import router from "./routes/index.js"

const app = express()

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(router)

app.listen(3000, ()=>{
    console.log('Server ready at: http://localhost:3000')
})