import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

// Controllers for Incidentes Bitacoras, for more 
// information see file "/Backend/prisma/schema.prima"

//main controllers ----------------------

export const getEmpaquePending = async (req, res) => {
    try {
        const {id} = req.params
        console.log(id)
        const result = await prisma.bitacoraLimpiezaEmpaques.findMany({
            where :{idUsuarioEmisor: Number(id)},
            select: {
                id: true,
                nombre: true,
                dia: true,
                fechaHora: true
            }
        })
        res.json(result)
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Could not add the entry:', error)
        }
    }
}

export const fillEmpaque = async (req, res) => {
    try {
        const {id}= req.params
        const {
            nombre,
            dia,
            fechaHora,
            pisos,
            mesas,
            selladores,
            basculas,
            rampas,
            estantes,
            bandejas,
            patines,
            observaciones,
            estado} = req.body

        const result = await prisma.bitacoraLimpiezaEmpaques.update({
            where: {id: Number(id)},
            data: {
                nombre,
                dia,
                fechaHora,
                pisos,
                mesas,
                selladores,
                basculas,
                rampas,
                estantes,
                bandejas,
                patines,
                observaciones,
                estado
            }
        })
        res.json(result)
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Entry not found')
        }
    }
}

// Complementary controllers ------------------------