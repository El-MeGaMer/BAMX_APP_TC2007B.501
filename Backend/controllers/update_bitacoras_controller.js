import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

export const updateBitacoraTemperatura = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        const result = await prisma.bitacoraTemperaturas.update({
            where: { id: Number(id) },
            data: { estado }
        })
        res.json(result)
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Could not add the entry:', error)
        }
    }
}

export const updateBitacoraExtintores = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        const result = await prisma.bitacoraExtintores.update({
            where: { id: Number(id) },
            data: { estado }
        })
        res.json(result)
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Could not add the entry:', error)
        }
    }
}

export const updateBitacoraLimpiezaAlimentoCompartido = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        const result = await prisma.bitacoraLimpiezaAlimentoCompartidos.update({
            where: { id: Number(id) },
            data: { estado }
        })
        res.json(result)
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Could not add the entry:', error)
        }
    }
}

export const updateBitacoraLimpiezaRecibos = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        const result = await prisma.bitacoraLimpiezaRecibos.update({
            where: { id: Number(id) },
            data: { estado }
        })
        res.json(result)
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Could not add the entry:', error)
        }
    }
}

export const updateBitacoraLimpiezaEmpaques = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        const result = await prisma.bitacoraLimpiezaEmpaques.update({
            where: { id: Number(id) },
            data: { estado }
        })
        res.json(result)
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Could not add the entry:', error)
        }
    }
}

export const updateBitacoraLimpiezaCribasFV = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        const result = await prisma.bitacoraLimpiezaCribasFV.update({
            where: { id: Number(id) },
            data: { estado }
        })
        res.json(result)
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Could not add the entry:', error)
        }
    }
}

export const updateBitacoraLimpiezaAlmacenes = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        const result = await prisma.bitacoraLimpiezaAlmacenes.update({
            where: { id: Number(id) },
            data: { estado }
        })
        res.json(result)
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Could not add the entry:', error)
        }
    }
}

export const updateExample = async (req, res) => {
    try {
        const { id } = req.params
        const { title, content, name } = req.body
        const result = await prisma.example.update({
            where: { id: Number(id) },
            data: { title, content, name }
        })
        res.json(result)
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Entry not found')
        }
    }
}