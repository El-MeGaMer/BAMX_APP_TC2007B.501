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


// Bitacoras por dia
export const getBitacorasPerDay = async (req, res) => {
    let today = new Date().toLocaleDateString('se-SE')
    console.log("Fecha de ahora:", today)

    const { id } = req.params

    function getBitacoraPerDay(areaFieldName) {
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
        const extintores = getBitacoraPerDay('areaBitacoraExtintor')
        const temperatura = getBitacoraPerDay('areaBitacoraTemperatura')
        const alimentosCompartido = getBitacoraPerDay('areaBitacoraLimpiezaAlimentoCompartido');
        const limpiezaRecibos = getBitacoraPerDay('areaBitacoraLimpiezaRecibos')
        const limpiezaEmpaques = getBitacoraPerDay('areaBitacoraLimpiezaEmpaques')
        const limpiezaCribas = getBitacoraPerDay('areaBitacoraLimpiezaCribasFVs')
        const limpiezaAlmacenes = getBitacoraPerDay('areaBitacoraLimpiezaAlmacenes')
        const limpiezaEntregas = getBitacoraPerDay('areaBitacoraLimpiezaEntregas')

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
    function getBitacoraNoRevisado(areaFieldName) {
        const bitacora = {
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
        const extintores = getBitacoraNoRevisado('areaBitacoraExtintor')
        const temperatura = getBitacoraNoRevisado('areaBitacoraTemperatura')
        const alimentosCompartido = getBitacoraNoRevisado('areaBitacoraLimpiezaAlimentoCompartido');
        const limpiezaRecibos = getBitacoraNoRevisado('areaBitacoraLimpiezaRecibos')
        const limpiezaEmpaques = getBitacoraNoRevisado('areaBitacoraLimpiezaEmpaques')
        const limpiezaCribas = getBitacoraNoRevisado('areaBitacoraLimpiezaCribasFVs')
        const limpiezaAlmacenes = getBitacoraNoRevisado('areaBitacoraLimpiezaAlmacenes')
        const limpiezaEntregas = getBitacoraNoRevisado('areaBitacoraLimpiezaEntregas')

        const bitacoraExt = await prisma.bitacoraExtintores.findMany(extintores)
        const bitacoraTem = await prisma.bitacoraTemperaturas.findMany(temperatura)
        const bitacoraAliCom = await prisma.bitacoraLimpiezaAlimentoCompartidos.findMany(alimentosCompartido)
        const bitacoraLimRec = await prisma.bitacoraLimpiezaRecibos.findMany(limpiezaRecibos)
        const bitacoraLimEmp = await prisma.bitacoraLimpiezaEmpaques.findMany(limpiezaEmpaques)
        const bitacoraLimCFV = await prisma.bitacoraLimpiezaCribasFV.findMany(limpiezaCribas)
        const bitacoraLimAl = await prisma.bitacoraLimpiezaAlmacenes.findMany(limpiezaAlmacenes)
        const bitacoraLimEnt = await prisma.bitacoraLimpiezaEntregas.findMany(limpiezaEntregas)

        const combinedResult  = [
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

        res.json(...bitacorasPerState)
    } catch (error) {
        console.error('Error! Entry not found:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

