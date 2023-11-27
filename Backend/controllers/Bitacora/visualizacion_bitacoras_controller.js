import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

// bitacoras por estado
export const getBitacorasState = async (req, res) => {
    const { estado } = req.params;
    const { nombreArea } = req.query;       // este controlador recibe el nombre area como query

    let today = new Date()
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1);

    function createCondition(areaFieldName, nombreArea) {
        const condition = {
            where: {                // devuelde las bitacoras dependiendo del estado ingresado   
                // y solamente las que fueron hechas en el ultimo mes                
                estado: String(estado),
                fechaHora: {
                    gte: firstDayOfMonth,
                    lt: lastDayOfMonth
                }
            },
            select: {               // con el select se agregan las variables que queremos en el json
                id: true,
                idUsuarioEmisor: true,
                idArea: true,
                nombre: true,
                // idRecordatorio: true,
                estado: true,
                fechaHora: true,
                [areaFieldName]: true
            }
        }

        if (nombreArea) {           // si se ingresa el nombre area como query lo agrega a la condicion
            condition.where[areaFieldName] = {
                nombreArea: String(nombreArea)
            };
        }
        return condition;
    }

    try {
        // llamamos la funcion para cada una de las bitacoras
        const incidnetes =  createCondition('area', nombreArea)
        const extintores = createCondition('areaBitacoraExtintor', nombreArea)
        const alimentosCompartido = createCondition('areaBitacoraLimpiezaAlimentoCompartido', nombreArea)
        const temperatura = createCondition('areaBitacoraTemperatura', nombreArea)
        const limpiezaRecibos = createCondition('areaBitacoraLimpiezaRecibos', nombreArea)
        const limpiezaEmpaques = createCondition('areaBitacoraLimpiezaEmpaques', nombreArea)
        const limpiezaCribas = createCondition('areaBitacoraLimpiezaCribasFVs', nombreArea)
        const limpiezaAlmacenes = createCondition('areaBitacoraLimpiezaAlmacenes', nombreArea)
        const limpiezaEntregas = createCondition('areaBitacoraLimpiezaEntregas', nombreArea)

        const bitacoraIn = await prisma.bitacoraIncidentes.findMany(incidnetes)
        const bitacoraExt = await prisma.bitacoraExtintores.findMany(extintores);
        const bitacoraAliCom = await prisma.bitacoraLimpiezaAlimentoCompartidos.findMany(alimentosCompartido);
        const bitacoraTem = await prisma.bitacoraTemperaturas.findMany(temperatura);
        const bitacoraLimRec = await prisma.bitacoraLimpiezaRecibos.findMany(limpiezaRecibos);
        const bitacoraLimEmp = await prisma.bitacoraLimpiezaEmpaques.findMany(limpiezaEmpaques);
        const bitacoraLimCFV = await prisma.bitacoraLimpiezaCribasFV.findMany(limpiezaCribas);
        const bitacoraLimAl = await prisma.bitacoraLimpiezaAlmacenes.findMany(limpiezaAlmacenes);
        const bitacoraLimEnt = await prisma.bitacoraLimpiezaEntregas.findMany(limpiezaEntregas);

        // unimos las bitacoras en un json
        const combinedResult = [
            ...bitacoraIn,
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
    const { id } = req.params

    let today = new Date().toLocaleDateString('se-SE')

    function bitacoraPerDay(areaFieldName) {
        const bitacora = {
            where: {                    // hacemos que solo muestre las bitacoras creadas hoy
                idUsuarioEmisor: Number(id),
                fechaHora: {
                    gte: new Date(today)
                }
            }, select: {
                id: true,
                nombre: true,
                idUsuarioEmisor: true,
                estado: true,
                fechaHora: true,
                [areaFieldName]: true
            }
        }
        return bitacora
    }

    try {
        // llamamos la funcion para cada una de las bitacoras
        const incidnetes = bitacoraPerDay('area')
        const extintores = bitacoraPerDay('areaBitacoraExtintor')
        const temperatura = bitacoraPerDay('areaBitacoraTemperatura')
        const alimentosCompartido = bitacoraPerDay('areaBitacoraLimpiezaAlimentoCompartido');
        const limpiezaRecibos = bitacoraPerDay('areaBitacoraLimpiezaRecibos')
        const limpiezaEmpaques = bitacoraPerDay('areaBitacoraLimpiezaEmpaques')
        const limpiezaCribas = bitacoraPerDay('areaBitacoraLimpiezaCribasFVs')
        const limpiezaAlmacenes = bitacoraPerDay('areaBitacoraLimpiezaAlmacenes')
        const limpiezaEntregas = bitacoraPerDay('areaBitacoraLimpiezaEntregas')

        const bitacoraIn = await prisma.bitacoraIncidentes.findMany(incidnetes)
        const bitacoraExt = await prisma.bitacoraExtintores.findMany(extintores)
        const bitacoraTem = await prisma.bitacoraTemperaturas.findMany(temperatura)
        const bitacoraAliCom = await prisma.bitacoraLimpiezaAlimentoCompartidos.findMany(alimentosCompartido)
        const bitacoraLimRec = await prisma.bitacoraLimpiezaRecibos.findMany(limpiezaRecibos)
        const bitacoraLimEmp = await prisma.bitacoraLimpiezaEmpaques.findMany(limpiezaEmpaques)
        const bitacoraLimCFV = await prisma.bitacoraLimpiezaCribasFV.findMany(limpiezaCribas)
        const bitacoraLimAl = await prisma.bitacoraLimpiezaAlmacenes.findMany(limpiezaAlmacenes)
        const bitacoraLimEnt = await prisma.bitacoraLimpiezaEntregas.findMany(limpiezaEntregas)

        // unimos las bitacoras en un json
        const combinedResult = [
            ...bitacoraIn,
            ...bitacoraExt,
            ...bitacoraTem,
            ...bitacoraAliCom,
            ...bitacoraLimRec,
            ...bitacoraLimEmp,
            ...bitacoraLimCFV,
            ...bitacoraLimAl,
            ...bitacoraLimEnt
        ];

        // filtramos la bitacora para que no muestre las bitacoras revisadas
        const bitacorasFiltrada = combinedResult.filter(item => item.estado !== "revisado");

        res.json(bitacorasFiltrada)
    } catch (error) {
        console.error('Error! Entry not found:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Json separados por revisado o no revisado
export const getBitacorasPending = async (req, res) => {
    let today = new Date()
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1);
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    function bitacoraPending(areaFieldName) {
        const bitacora = {
            where: {
                fechaHora: {
                    gte: firstDayOfMonth,
                    lt: lastDayOfMonth
                }
            },
            select: {
                id: true,
                estado: true,
                fechaHora: true,
                nombre: true,
                [areaFieldName]: true
            }
        }
        return bitacora
    }

    try {
        // llamamos la funcion para cada una de las bitacoras
        const incidnetes = bitacoraPending('area')
        const extintores = bitacoraPending('areaBitacoraExtintor')
        const temperatura = bitacoraPending('areaBitacoraTemperatura')
        const alimentosCompartido = bitacoraPending('areaBitacoraLimpiezaAlimentoCompartido');
        const limpiezaRecibos = bitacoraPending('areaBitacoraLimpiezaRecibos')
        const limpiezaEmpaques = bitacoraPending('areaBitacoraLimpiezaEmpaques')
        const limpiezaCribas = bitacoraPending('areaBitacoraLimpiezaCribasFVs')
        const limpiezaAlmacenes = bitacoraPending('areaBitacoraLimpiezaAlmacenes')
        const limpiezaEntregas = bitacoraPending('areaBitacoraLimpiezaEntregas')

        const bitacoraIn = await prisma.bitacoraIncidentes.findMany(incidnetes)
        const bitacoraExt = await prisma.bitacoraExtintores.findMany(extintores)
        const bitacoraTem = await prisma.bitacoraTemperaturas.findMany(temperatura)
        const bitacoraAliCom = await prisma.bitacoraLimpiezaAlimentoCompartidos.findMany(alimentosCompartido)
        const bitacoraLimRec = await prisma.bitacoraLimpiezaRecibos.findMany(limpiezaRecibos)
        const bitacoraLimEmp = await prisma.bitacoraLimpiezaEmpaques.findMany(limpiezaEmpaques)
        const bitacoraLimCFV = await prisma.bitacoraLimpiezaCribasFV.findMany(limpiezaCribas)
        const bitacoraLimAl = await prisma.bitacoraLimpiezaAlmacenes.findMany(limpiezaAlmacenes)
        const bitacoraLimEnt = await prisma.bitacoraLimpiezaEntregas.findMany(limpiezaEntregas)

        // unimos las bitacoras en un json
        const combinedResult = [
            ...bitacoraIn,
            ...bitacoraExt,
            ...bitacoraTem,
            ...bitacoraAliCom,
            ...bitacoraLimRec,
            ...bitacoraLimEmp,
            ...bitacoraLimCFV,
            ...bitacoraLimAl,
            ...bitacoraLimEnt
        ];

        // filtramos para que muestre las bitacoras que no estan revisadas o en revision
        const bitacorasRevisadas = combinedResult.filter(item => item.estado == "revisado")
        const bitacotasNoRevisadas = combinedResult.filter(item => item.estado == "enRevision")

        const bitacorasPerState = [bitacorasRevisadas, bitacotasNoRevisadas]

        res.json(bitacorasPerState)
    } catch (error) {
        console.error('Error! Entry not found:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const getBitacorasExport = async (req, res) => {

    function bitacotarasExport(areaFieldName) {
        const condition = {
            include: {                  // incluimos el area de cada bitacora
                [areaFieldName]: true
            }
        }
        return condition;
    }

    // funcion que obtiene la semana del año en que se creo la bitacora
    function getWeek(date) {
        const d = new Date(date)
        d.setHours(0, 0, 0, 0)
        d.setDate(d.getDate() + 4 - (d.getDay() || 7))
        const yearStart = new Date(d.getFullYear(), 0, 1)
        const weekNumber = Math.ceil(((d - yearStart) / 86400000 + 1) / 7)
        return weekNumber
    }

    // funcion que retorna el tipo de bitacora
    function getBitacoraType(bitacora) {
        if (bitacora.areaBitacoraExtintor) {
            return 'bitacorasExtintor';
        } else if (bitacora.areaBitacoraLimpiezaAlimentoCompartido) {
            return 'bitacorasLimpiezaAlimentoCompartido';
        } else if (bitacora.areaBitacoraTemperatura) {
            return 'bitacoraTemperatura';
        } else if (bitacora.areaBitacoraLimpiezaRecibos) {
            return 'bitacoraLimpiezaRecibos';
        } else if (bitacora.areaBitacoraLimpiezaEmpaques) {
            return 'bitacoraLimpiezaEmpaques';
        } else if (bitacora.areaBitacoraLimpiezaCribasFVs) {
            return 'bitacoraLimpiezaCribasFVs';
        } else if (bitacora.areaBitacoraLimpiezaAlmacenes) {
            return 'BitacoraLimpiezaAlmacenes';
        } else if (bitacora.areaBitacoraLimpiezaEntregas) {
            return 'bitacoraLimpiezaEntregas';
        } else if (bitacora.area) {
            return 'bitacoraIndicentes'
        }
    }

    try {
        // llamamos la funcion para cada una de las bitacoras
        const incidentes = bitacotarasExport('area')
        const extintores = bitacotarasExport('areaBitacoraExtintor')
        const alimentosCompartido = bitacotarasExport('areaBitacoraLimpiezaAlimentoCompartido')
        const temperatura = bitacotarasExport('areaBitacoraTemperatura')
        const limpiezaRecibos = bitacotarasExport('areaBitacoraLimpiezaRecibos')
        const limpiezaEmpaques = bitacotarasExport('areaBitacoraLimpiezaEmpaques')
        const limpiezaCribas = bitacotarasExport('areaBitacoraLimpiezaCribasFVs')
        const limpiezaAlmacenes = bitacotarasExport('areaBitacoraLimpiezaAlmacenes')
        const limpiezaEntregas = bitacotarasExport('areaBitacoraLimpiezaEntregas')

        const bitacoraIn = await prisma.bitacoraIncidentes.findMany(incidentes)
        const bitacoraExt = await prisma.bitacoraExtintores.findMany(extintores)
        const bitacoraAliCom = await prisma.bitacoraLimpiezaAlimentoCompartidos.findMany(alimentosCompartido)
        const bitacoraTem = await prisma.bitacoraTemperaturas.findMany(temperatura)
        const bitacoraLimRec = await prisma.bitacoraLimpiezaRecibos.findMany(limpiezaRecibos)
        const bitacoraLimEmp = await prisma.bitacoraLimpiezaEmpaques.findMany(limpiezaEmpaques)
        const bitacoraLimCFV = await prisma.bitacoraLimpiezaCribasFV.findMany(limpiezaCribas)
        const bitacoraLimAl = await prisma.bitacoraLimpiezaAlmacenes.findMany(limpiezaAlmacenes)
        const bitacoraLimEnt = await prisma.bitacoraLimpiezaEntregas.findMany(limpiezaEntregas)

        // unimos las bitacoras en un json
        const combinedResult = [
            ...bitacoraIn,
            ...bitacoraExt,
            ...bitacoraAliCom,
            ...bitacoraTem,
            ...bitacoraLimRec,
            ...bitacoraLimEmp,
            ...bitacoraLimCFV,
            ...bitacoraLimAl,
            ...bitacoraLimEnt,
        ];

        // json para organizar las bitacoras por año, semana y tipo de bitacora
        const organizedResult = {};

        combinedResult.forEach((bitacora) => {
            const year = bitacora.fechaHora.getFullYear();
            const week = getWeek(bitacora.fechaHora);

            // añadimos el año
            if (!organizedResult[year]) {
                organizedResult[year] = {};
            }

            // añadimos la semama
            if (!organizedResult[year][week]) {
                organizedResult[year][week] = {}
            }

            // llamamos a la funcion para añadir el tipo de bitacora
            const bitacoraType = getBitacoraType(bitacora)
            if (!organizedResult[year][week][bitacoraType]) {
                organizedResult[year][week][bitacoraType] = [];
            }

            organizedResult[year][week][bitacoraType].push(bitacora);
        });

        res.json(organizedResult)
    } catch (error) {
        console.error('Error! Entry not found:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
};
