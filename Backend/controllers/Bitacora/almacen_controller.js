import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

// Controllers for Incidentes Bitacoras, for more 
// information see file "/Backend/prisma/schema.prima"

//main controllers ----------------------

export const getAlmacenPending = async (req, res) => {
    try {
        const {id} = req.params
        console.log(id)
        const result = await prisma.bitacoraLimpiezaAlmacenes.findMany({
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

export const fillAlmacen = async (req, res) => {
    try {
        const {id}= req.params
        const {
            nombre,
            dia,
            fechaHora,
            pisos,
            pasillos,
            extintores,
            cuartosFrios,
            puertas,
            muros,
            racks,
            cortinas,
            coladeras,
            rejillas,
            montacargas,
            patines,
            observaciones,
            estado} = req.body

        const result = await prisma.bitacoraLimpiezaAlmacenes.update({
            where: {id: Number(id)},
            data: {
                nombre,
                dia: Number(dia),
                fechaHora: new Date(fechaHora).toISOString(),
                pisos: Boolean(pisos),
                pasillos: Boolean(pasillos),
                extintores: Boolean(extintores),
                cuartosFrios: Boolean(cuartosFrios),
                puertas: Boolean(puertas),
                muros: Boolean(muros),
                racks: Boolean(racks),
                cortinas: Boolean(cortinas),
                coladeras: Boolean(coladeras),
                rejillas: Boolean(rejillas),
                montacargas: Boolean(montacargas),
                patines: Boolean(patines),
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