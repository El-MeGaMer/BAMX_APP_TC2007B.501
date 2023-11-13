import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

const estados = ['revisado', 'noRevisado', 'enRevision']

export const getBitacorasRevisadas = async (req, res) => {
    try {
        const bitacoraExt = await prisma.bitacoraExtintores.findMany({
            where: { estado: estados[0] }
        });
        const bitacoraAliCom = await prisma.bitacoraLimpiezaAlimentoCompartidos.findMany({
            where: { estado: estados[0] }
        });
        const bitacoraTemp = await prisma.bitacoraTemperaturas.findMany({
            where: { estado: estados[0] }
        });
        const bitacoraLimRec = await prisma.bitacoraLimpiezaRecibos.findMany({
            where: { estado: estados[0] }
        });
        const bitacoraLimEmp = await prisma.bitacoraLimpiezaEmpaques.findMany({
            where: { estado: estados[0] }
        });
        const bitacoraLimCFV = await prisma.bitacoraLimpiezaCribasFV.findMany({
            where: { estado: estados[0] }
        });
        const bitacoraLimAl = await prisma.bitacoraLimpiezaAlmacenes.findMany({
            where: { estado: estados[0] }
        });
        const bitacoraLimEnt = await prisma.bitacoraLimpiezaEntregas.findMany({
            where: { estado: estados[0] }
        });
        const combinedResult = [
            ...bitacoraExt,
            ...bitacoraAliCom,
            ...bitacoraTemp,
            ...bitacoraLimRec,
            ...bitacoraLimEmp,
            ...bitacoraLimCFV,
            ...bitacoraLimAl,
            ...bitacoraLimEnt];
        res.json(combinedResult)
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Entry not found:', error)
        }
    }
}

export const getBitacorasNoRevisadas = async (req, res) => {
    try {
        const bitacoraExt = await prisma.bitacoraExtintores.findMany({
            where: { estado: estados[1] }
        });
        const bitacoraAliCom = await prisma.bitacoraLimpiezaAlimentoCompartidos.findMany({
            where: { estado: estados[1] }
        });
        const bitacoraTemp = await prisma.bitacoraTemperaturas.findMany({
            where: { estado: estados[1] }
        });
        const bitacoraLimRec = await prisma.bitacoraLimpiezaRecibos.findMany({
            where: { estado: estados[1] }
        });
        const bitacoraLimEmp = await prisma.bitacoraLimpiezaEmpaques.findMany({
            where: { estado: estados[1] }
        });
        const bitacoraLimCFV = await prisma.bitacoraLimpiezaCribasFV.findMany({
            where: { estado: estados[1] }
        });
        const bitacoraLimAl = await prisma.bitacoraLimpiezaAlmacenes.findMany({
            where: { estado: estados[1] }
        });
        const bitacoraLimEnt = await prisma.bitacoraLimpiezaEntregas.findMany({
            where: { estado: estados[1] }
        });
        const combinedResult = [
            ...bitacoraExt,
            ...bitacoraAliCom,
            ...bitacoraTemp,
            ...bitacoraLimRec,
            ...bitacoraLimEmp,
            ...bitacoraLimCFV,
            ...bitacoraLimAl,
            ...bitacoraLimEnt];
        res.json(combinedResult)
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Entry not found:', error)
        }
    }
}

export const getBitacorasEnRevision = async (req, res) => {
    try {
        const bitacoraExt = await prisma.bitacoraExtintores.findMany({
            where: { estado: estados[2] }
        });
        const bitacoraAliCom = await prisma.bitacoraLimpiezaAlimentoCompartidos.findMany({
            where: { estado: estados[2] }
        });
        const bitacoraTemp = await prisma.bitacoraTemperaturas.findMany({
            where: { estado: estados[2] }
        });
        const bitacoraLimRec = await prisma.bitacoraLimpiezaRecibos.findMany({
            where: { estado: estados[2] }
        });
        const bitacoraLimEmp = await prisma.bitacoraLimpiezaEmpaques.findMany({
            where: { estado: estados[2] }
        });
        const bitacoraLimCFV = await prisma.bitacoraLimpiezaCribasFV.findMany({
            where: { estado: estados[2] }
        });
        const bitacoraLimAl = await prisma.bitacoraLimpiezaAlmacenes.findMany({
            where: { estado: estados[2] }
        });
        const bitacoraLimEnt = await prisma.bitacoraLimpiezaEntregas.findMany({
            where: { estado: estados[2] }
        });
        const combinedResult = [
            ...bitacoraExt,
            ...bitacoraAliCom,
            ...bitacoraTemp,
            ...bitacoraLimRec,
            ...bitacoraLimEmp,
            ...bitacoraLimCFV,
            ...bitacoraLimAl,
            ...bitacoraLimEnt];
        res.json(combinedResult)
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Entry not found:', error)
        }
    }
}
