import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient


export const getBitacorasEstado = async (req, res) => {
    const { estado } = req.params;
    const { nombreArea } = req.query;


    let today = new Date()
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1);
    // today = new Date().toLocaleDateString('se-SE')

    console.log("Fecha de ahora:", today)
    console.log("Primer dia del mes:", firstDayOfMonth)
    console.log("Ultimo dia del mes:", lastDayOfMonth)

    function createCondition(areaFieldName, nombreArea) {
        const condition = {
            where: {
                estado: String(estado),
                fechaHora: {
                    gte: firstDayOfMonth,
                    lt: lastDayOfMonth
                }
            },
            select: {
                id: true,
                idUsuarioEmisor: true,
                idArea: true,
                idRecordatorio: true,
                estado: true,
                fechaHora: true,
                [areaFieldName]: true
            }
        }

        if (nombreArea) {
            condition.where[areaFieldName] = {
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


        const bitacoraExt = await prisma.bitacoraExtintores.findMany(extintores);
        const bitacoraAliCom = await prisma.bitacoraLimpiezaAlimentoCompartidos.findMany(alimentosCompartido);
        const bitacoraTem = await prisma.bitacoraTemperaturas.findMany(temperatura);
        const bitacoraLimRec = await prisma.bitacoraLimpiezaRecibos.findMany(limpiezaRecibos);
        const bitacoraLimEmp = await prisma.bitacoraLimpiezaEmpaques.findMany(limpiezaEmpaques);
        const bitacoraLimCFV = await prisma.bitacoraLimpiezaCribasFV.findMany(limpiezaCribas);
        const bitacoraLimAl = await prisma.bitacoraLimpiezaAlmacenes.findMany(limpiezaAlmacenes);
        const bitacoraLimEnt = await prisma.bitacoraLimpiezaEntregas.findMany(limpiezaEntregas);

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


// Bitacoras por dia
export const getBitacorasPerDay = async (req, res) => {
    let today = new Date().toLocaleDateString('se-SE')
    console.log("Fecha de ahora:", today)

    const { id } = req.params

    function bitacoraPerDay(areaFieldName) {
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
        const extintores = bitacoraPerDay('areaBitacoraExtintor')
        const temperatura = bitacoraPerDay('areaBitacoraTemperatura')
        const alimentosCompartido = bitacoraPerDay('areaBitacoraLimpiezaAlimentoCompartido');
        const limpiezaRecibos = bitacoraPerDay('areaBitacoraLimpiezaRecibos')
        const limpiezaEmpaques = bitacoraPerDay('areaBitacoraLimpiezaEmpaques')
        const limpiezaCribas = bitacoraPerDay('areaBitacoraLimpiezaCribasFVs')
        const limpiezaAlmacenes = bitacoraPerDay('areaBitacoraLimpiezaAlmacenes')
        const limpiezaEntregas = bitacoraPerDay('areaBitacoraLimpiezaEntregas')

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

// Json separados por revisado o no revisado
export const getBitacorasState = async (req, res) => {

    let today = new Date()
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1);

    console.log("Fecha de ahora:", today)
    console.log("Primer dia del mes:", firstDayOfMonth)
    console.log("Ultimo dia del mes:", lastDayOfMonth)

    function bitacoraState(areaFieldName) {
        const bitacora = {
            where: {
                fechaHora: {
                    gte: firstDayOfMonth,
                    lt: lastDayOfMonth
                }
            },
            select: {
                id: true,
                idUsuarioEmisor: true,
                estado: true,
                [areaFieldName]: true
            }
        }
        return bitacora
    }

    try {
        const extintores = bitacoraState('areaBitacoraExtintor')
        const temperatura = bitacoraState('areaBitacoraTemperatura')
        const alimentosCompartido = bitacoraState('areaBitacoraLimpiezaAlimentoCompartido');
        const limpiezaRecibos = bitacoraState('areaBitacoraLimpiezaRecibos')
        const limpiezaEmpaques = bitacoraState('areaBitacoraLimpiezaEmpaques')
        const limpiezaCribas = bitacoraState('areaBitacoraLimpiezaCribasFVs')
        const limpiezaAlmacenes = bitacoraState('areaBitacoraLimpiezaAlmacenes')
        const limpiezaEntregas = bitacoraState('areaBitacoraLimpiezaEntregas')

        const bitacoraExt = await prisma.bitacoraExtintores.findMany(extintores)
        const bitacoraTem = await prisma.bitacoraTemperaturas.findMany(temperatura)
        const bitacoraAliCom = await prisma.bitacoraLimpiezaAlimentoCompartidos.findMany(alimentosCompartido)
        const bitacoraLimRec = await prisma.bitacoraLimpiezaRecibos.findMany(limpiezaRecibos)
        const bitacoraLimEmp = await prisma.bitacoraLimpiezaEmpaques.findMany(limpiezaEmpaques)
        const bitacoraLimCFV = await prisma.bitacoraLimpiezaCribasFV.findMany(limpiezaCribas)
        const bitacoraLimAl = await prisma.bitacoraLimpiezaAlmacenes.findMany(limpiezaAlmacenes)
        const bitacoraLimEnt = await prisma.bitacoraLimpiezaEntregas.findMany(limpiezaEntregas)

        const combinedResult = [
            ...bitacoraExt,
            ...bitacoraTem,
            ...bitacoraAliCom,
            ...bitacoraLimRec,
            ...bitacoraLimEmp,
            ...bitacoraLimCFV,
            ...bitacoraLimAl,
            ...bitacoraLimEnt
        ];

        const bitacorasRevisadas = combinedResult.filter(item => item.estado == "noRevisado");
        const bitacotasNoRevisadas = combinedResult.filter(item => item.estado == "enRevision");

        const bitacorasPerState = [bitacorasRevisadas, bitacotasNoRevisadas]

        res.json(bitacorasPerState)
    } catch (error) {
        console.error('Error! Entry not found:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}