import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

// Controllers for Incidentes Bitacoras, for more 
// information see file "/Backend/prisma/schema.prima"

//main controllers ----------------------

export const updateEmpaque = async (req, res) => {
    try {
        const {idUser, id}= req.params

        const data = req.body

        result = await prisma.bitacoraLimpiezaEmpaques.update({
            where: {id: parseInt(id)},
            data: data
        })
         
        res.json(result)

    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Entry not found')
        }
    }
}

// Complementary controllers ------------------------