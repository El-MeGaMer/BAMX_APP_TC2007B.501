import express from 'express'
import router from "./routes/index.js"

const app = express()
const PORT = 3000

app.use(express.json())
app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(router)

app.listen(PORT, ()=>{
    console.log(`Server ready at port ${PORT}`)
})
