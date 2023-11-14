import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

// Controllers for Incidentes Bitacoras, for more 
// information see file "/Backend/prisma/schema.prima"

//main controllers ----------------------

export const createIncidente = async (req, res) => {
    try {
        const { 
            idUsuarioEmisor, 
            idUsuarioSupervisor, 
            idArea, 
            nombre, 
            fechaHora,
            descripcion,
            imagen } = req.body
        const result = await prisma.bitacoraIncidentes.create({
            data: {
                idUsuarioEmisor, 
                idUsuarioSupervisor, 
                idArea, 
                nombre, 
                fechaHora,
                descripcion,
                imagen
            }
        })
        res.json(result)
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Could not add the entry:', error)
        }
    }
}

export const getIncidentes = async (req, res) => {
    try {
        const {idArea} =req.params
        const result = await prisma.bitacoraIncidentes.findMany({
            where :{idArea: Number(idArea)},
            select: {
                idUsuarioEmisor: true,
                nombre: true,
                fechaHora: true,
                descripcion: true,
                imagen: true
            }
        })
        res.json(result)
    } catch(error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Could not add the entry:', error)
        }
    }
}

// Complementary controllers -----------------------------

export const deleteIncidenteById = async (req, res) => {
    try {
        const {id} = req.params
        const result = await prisma.bitacoraIncidentes.delete({
            where: {id: Number(id)}
        })
        res.json(result)
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Could not delete entry')
        }
    } 
}