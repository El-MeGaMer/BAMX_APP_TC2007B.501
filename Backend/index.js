import express from 'express'
import bodyParser from 'body-parser'
import router from "./routes/index.js"

const app = express()
const PORT = 3000

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(router)

app.listen(PORT, ()=>{
    console.log(`Server ready at port ${PORT}`)
})