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
            include: { areaBitacoraExtintor: true }
        });
        const bitacoraAliCom = await prisma.bitacoraLimpiezaAlimentoCompartidos.findMany({
            where: alimentosCompartido,
            include: { areaBitacoraLimpiezaAlimentoCompartido: true }
        });
        const bitacoraTem = await prisma.bitacoraTemperaturas.findMany({
            where: temperatura,
            include: { areaBitacoraTemperatura: true }
        });
        const bitacoraLimRec = await prisma.bitacoraLimpiezaRecibos.findMany({
            where: limpiezaRecibos,
            include: { areaBitacoraLimpiezaRecibos: true }
        });
        const bitacoraLimEmp = await prisma.bitacoraLimpiezaEmpaques.findMany({
            where: limpiezaEmpaques,
            include: { areaBitacoraLimpiezaEmpaques: true }
        });
        const bitacoraLimCFV = await prisma.bitacoraLimpiezaCribasFV.findMany({
            where: limpiezaCribas,
            include: { areaBitacoraLimpiezaCribasFVs: true }
        });
        const bitacoraLimAl = await prisma.bitacoraLimpiezaAlmacenes.findMany({
            where: limpiezaAlmacenes,
            include: { areaBitacoraLimpiezaAlmacenes: true }
        });
        const bitacoraLimEnt = await prisma.bitacoraLimpiezaEntregas.findMany({
            where: limpiezaEntregas,
            include: { areaBitacoraLimpiezaEntregas: true }
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

