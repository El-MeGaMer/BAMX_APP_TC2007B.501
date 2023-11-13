import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

export const postRecordatorio = async (req, res) => {
    try {
        const {nombre, descripcion, horaInicial, horaFinal} = req.body
        const result = await prisma.recordatorios.create({
            data: {
                nombre, 
                descripcion, 
                horaInicial,
                horaFinal
            }
        })
        res.json(result)
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Could not add the entry:', error)
        }
    }
}

export const getRecordatorio = async (req, res) => {
    try {
        const startOfDay = new Date().toLocaleDateString('se-SE')
        // Solo devolver los recordatorios futuros
        const result = await prisma.recordatorios.findMany({
            where: {
                horaInicial: {
                    gte: new Date(startOfDay)
                }
            }
        })
        res.json(result)
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Entry not found:', error)
        }
    }
}

export const updateRecordatorio = async (req, res) => {
    try {
        const {id} = req.params
        const {nombre, descripcion, horaInicial, horaFinal} = req.body
        const result = await prisma.recordatorios.update({
            where: {id: Number(id)},
            data: {nombre, descripcion, horaInicial, horaFinal}
        })
        res.json(result)
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Entry not found')
        }
    }

}

export const deleteRecordatorio = async (req, res) => {
    try {
        const {id} = req.params
        const result = await prisma.recordatorios.delete({
            where: {id: Number(id)}
        })
        res.json(result)
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Could not delete entry')
        }
    } 
}