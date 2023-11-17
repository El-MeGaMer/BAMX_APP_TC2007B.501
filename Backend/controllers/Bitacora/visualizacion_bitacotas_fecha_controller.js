
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

export const getBitacorasPerDay = async (req, res) => {

    let today = new Date().toLocaleDateString('se-SE')
    console.log("Fecha de ahora:", today)

    const { id } = req.params

    function createBitacoraPerDay(areaFieldName) {
        const bitacora = {
            where: {
                idUsuarioEmisor: Number(id),
                fechaHora: {
                    gte: new Date(today)
                }
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
        const extintores = createBitacoraPerDay('areaBitacoraExtintor')
        const temperatura = createBitacoraPerDay('areaBitacoraTemperatura')
        const alimentosCompartido = createBitacoraPerDay('areaBitacoraLimpiezaAlimentoCompartido');
        const limpiezaRecibos = createBitacoraPerDay('areaBitacoraLimpiezaRecibos')
        const limpiezaEmpaques = createBitacoraPerDay('areaBitacoraLimpiezaEmpaques')
        const limpiezaCribas = createBitacoraPerDay('areaBitacoraLimpiezaCribasFVs')
        const limpiezaAlmacenes = createBitacoraPerDay('areaBitacoraLimpiezaAlmacenes')
        const limpiezaEntregas = createBitacoraPerDay('areaBitacoraLimpiezaEntregas')


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

        const bitacorasFiltrada = combinedResult.filter(item => item.estado !== "revisado");

        res.json(bitacorasFiltrada)
    } catch (error) {
        console.error('Error! Entry not found:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}