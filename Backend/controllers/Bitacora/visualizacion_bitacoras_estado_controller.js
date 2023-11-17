
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

// en revision y revisadas
export const getBitacorasState = async (req, res) => {
    // const { estado } = req.params;
    // const { nombreArea } = req.query;


    function createBitacoraState(areaFieldName) {
        const bitacora = {
            where: {
                estado: "noRevisado",
            }, select: {
                id: true,
                idUsuarioEmisor: true,
                estado: true,
                [areaFieldName]: true
            }
        }

        return bitacora
    }

    try {
        const extintores = createBitacoraState('areaBitacoraExtintor')
        const temperatura = createBitacoraState('areaBitacoraTemperatura')
        const alimentosCompartido = createBitacoraState('areaBitacoraLimpiezaAlimentoCompartido');
        const limpiezaRecibos = createBitacoraState('areaBitacoraLimpiezaRecibos')
        const limpiezaEmpaques = createBitacoraState('areaBitacoraLimpiezaEmpaques')
        const limpiezaCribas = createBitacoraState('areaBitacoraLimpiezaCribasFVs')
        const limpiezaAlmacenes = createBitacoraState('areaBitacoraLimpiezaAlmacenes')
        const limpiezaEntregas = createBitacoraState('areaBitacoraLimpiezaEntregas')


        const bitacoraExtPD = await prisma.bitacoraExtintores.findMany(extintores)
        const bitacoraTemPD = await prisma.bitacoraTemperaturas.findMany(temperatura)
        const bitacoraAliComPD = await prisma.bitacoraLimpiezaAlimentoCompartidos.findMany(alimentosCompartido)
        const bitacoraLimRecPD = await prisma.bitacoraLimpiezaRecibos.findMany(limpiezaRecibos)
        const bitacoraLimEmpPD = await prisma.bitacoraLimpiezaEmpaques.findMany(limpiezaEmpaques)
        const bitacoraLimCFVPD = await prisma.bitacoraLimpiezaCribasFV.findMany(limpiezaCribas)
        const bitacoraLimAlPD = await prisma.bitacoraLimpiezaAlmacenes.findMany(limpiezaAlmacenes)
        const bitacoraLimEntPD = await prisma.bitacoraLimpiezaEntregas.findMany(limpiezaEntregas)
        
        const combinedResult = [
            ...bitacoraExtPD,
            ...bitacoraTemPD,
            ...bitacoraAliComPD,
            ...bitacoraLimRecPD,
            ...bitacoraLimEmpPD,
            ...bitacoraLimCFVPD,
            ...bitacoraLimAlPD,
            ...bitacoraLimEntPD
        ];

        // const bitacorasFiltrada = combinedResult.filter(item => item.estado !== "revisado");

        res.json(combinedResult)
    } catch (error) {
        console.error('Error! Entry not found:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}