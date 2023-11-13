import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

// Controllers for Incidentes Bitacoras, for more 
// information see file "/Backend/prisma/schema.prima"

//main controllers ----------------------

export const getReciboPending = async (req, res) => {
    try {
        const {id} = req.params
        console.log(id)
        const result = await prisma.bitacoraLimpiezaRecibos.findMany({
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

export const fillRecibo = async (req, res) => {
    try {
        const {id}= req.params
        const {
            nombre,
            dia,
            fechaHora,
            areaArmado,
            areaRecibo,
            patio,
            rampas,
            cuartosFrios,
            congelador,
            transporte,
            observaciones,
            estado} = req.body

        const result = await prisma.bitacoraLimpiezaRecibos.update({
            where: {id: Number(id)},
            data: {
                nombre,
                dia: Number(dia),
                fechaHora: new Date(fechaHora).toISOString(),
                areaArmado: Boolean(areaArmado),
                areaRecibo: Boolean(areaRecibo),
                patio: Boolean(patio),
                rampas: Boolean(rampas),
                cuartosFrios: Boolean(cuartosFrios),
                congelador: Boolean(congelador),
                transporte: Boolean(transporte),
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
