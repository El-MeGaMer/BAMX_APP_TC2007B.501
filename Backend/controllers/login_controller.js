import { PrismaClient } from "@prisma/client"

export const verUser = (req, res) => {
    try{
        const data = req.body

    }
    catch(error){
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Entry not found')
        }
        res.json({ status: 'error', message: 'Hubo un error al mandar la informacion'})
    }
}

