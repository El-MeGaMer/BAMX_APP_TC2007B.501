import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

export const getBitacorasEstado = async (req, res) => {
    const { estado } = req.params;
    const { nombreArea } = req.query;

    function createCondition(areaFieldName, nombreArea) {
        const condition = {
            estado: String(estado),
        };

        if (nombreArea) {
            condition[areaFieldName] = {
                nombreArea: String(nombreArea)
            };
        }
        return condition;
    }

    try {
        const extintores = createCondition('areaBitacoraExtintor', nombreArea);
        const alimentosCompartido = createCondition('areaBitacoraLimpiezaAlimentoCompartido', nombreArea);
        const temperatura = createCondition('areaBitacoraTemperatura', nombreArea)
        const limpiezaRecibos = createCondition('areaBitacoraLimpiezaRecibos', nombreArea)
        const limpiezaEmpaques = createCondition('areaBitacoraLimpiezaEmpaques', nombreArea)
        const limpiezaCribas = createCondition('areaBitacoraLimpiezaCribasFVs', nombreArea)
        const limpiezaAlmacenes = createCondition('areaBitacoraLimpiezaAlmacenes', nombreArea)
        const limpiezaEntregas = createCondition('areaBitacoraLimpiezaEntregas', nombreArea)

        const bitacoraExt = await prisma.bitacoraExtintores.findMany({
            where: extintores,
            select: {
                id: true,
                idUsuarioEmisor: true,
                idArea: true,
                idRecordatorio: true,
                estado: true,
                areaBitacoraExtintor: true 
            },
        });
        const bitacoraAliCom = await prisma.bitacoraLimpiezaAlimentoCompartidos.findMany({
            where: alimentosCompartido,
            select: {
                id: true,
                idUsuarioEmisor: true,
                idArea: true,
                idRecordatorio: true,
                estado: true,
                areaBitacoraLimpiezaAlimentoCompartido: true
            },
        });
        const bitacoraTem = await prisma.bitacoraTemperaturas.findMany({
            where: temperatura,
            select: {
                id: true,
                idUsuarioEmisor: true,
                idArea: true,
                idRecordatorio: true,
                estado: true,
                areaBitacoraTemperatura: true
            },
        });
        const bitacoraLimRec = await prisma.bitacoraLimpiezaRecibos.findMany({
            where: limpiezaRecibos,
            select: {
                id: true,
                idUsuarioEmisor: true,
                idArea: true,
                idRecordatorio: true,
                estado: true,
                areaBitacoraLimpiezaRecibos: true 
            },
        });
        const bitacoraLimEmp = await prisma.bitacoraLimpiezaEmpaques.findMany({
            where: limpiezaEmpaques,
            select: {
                id: true,
                idUsuarioEmisor: true,
                idArea: true,
                idRecordatorio: true,
                estado: true,
                areaBitacoraLimpiezaEmpaques: true
            },
        });
        const bitacoraLimCFV = await prisma.bitacoraLimpiezaCribasFV.findMany({
            where: limpiezaCribas,
            select: {
                id: true,
                idUsuarioEmisor: true,
                idArea: true,
                idRecordatorio: true,
                estado: true,
                areaBitacoraLimpiezaCribasFVs: true
            },
        });
        const bitacoraLimAl = await prisma.bitacoraLimpiezaAlmacenes.findMany({
            where: limpiezaAlmacenes,
            select: {
                id: true,
                idUsuarioEmisor: true,
                idArea: true,
                idRecordatorio: true,
                estado: true,
                areaBitacoraLimpiezaAlmacenes: true
            },
        });
        const bitacoraLimEnt = await prisma.bitacoraLimpiezaEntregas.findMany({
            where: limpiezaEntregas,
            select: {
                id: true,
                idUsuarioEmisor: true,
                idArea: true,
                idRecordatorio: true,
                estado: true,
                areaBitacoraLimpiezaEntregas: true
            },
        });

        const combinedResult = [
            ...bitacoraExt,
            ...bitacoraAliCom,
            ...bitacoraTem,
            ...bitacoraLimRec,
            ...bitacoraLimEmp,
            ...bitacoraLimCFV,
            ...bitacoraLimAl,
            ...bitacoraLimEnt
        ];

        res.json(combinedResult);
    } catch (error) {
        console.error('Error! Entry not found:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

