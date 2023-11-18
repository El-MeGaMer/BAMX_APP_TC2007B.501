import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

// Controllers for Incidentes Bitacoras, for more 
// information see file "/Backend/prisma/schema.prima"

//main controllers ----------------------

export const updateAlmacen = async (req, res) => {
    try {
        const {id}= req.params
        const newData = req.body

        console.log(Number(id))
        console.log(newData.observaciones)
        const result = await prisma.bitacoraLimpiezaAlmacenes.update({
            where: {id: Number(id)},
            data: newData
        })
        
        res.json(result)

    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Entry not found')
        }
    }
}

// Complementary controllers ------------------------