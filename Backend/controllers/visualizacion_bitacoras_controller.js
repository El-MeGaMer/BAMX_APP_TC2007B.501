import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

// const estados = ['revisado', 'noRevisado', 'enRevision']

export const getBitacorasEstado = async (req, res) => {
    const { estado } = req.params
    // const { id } = req.body
    // id = await prisma.usuarios.findUnique({
    //     where { id: }
    // })

    try {
        const bitacoraExt = await prisma.bitacoraExtintores.findMany({
            where: { estado: String(estado) }
        });
        const bitacoraAliCom = await prisma.bitacoraLimpiezaAlimentoCompartidos.findMany({
            where: { estado: String(estado) }
        });
        const bitacoraTemp = await prisma.bitacoraTemperaturas.findMany({
            where: { estado: String(estado) }
        });
        const bitacoraLimRec = await prisma.bitacoraLimpiezaRecibos.findMany({
            where: { estado: String(estado) }
        });
        const bitacoraLimEmp = await prisma.bitacoraLimpiezaEmpaques.findMany({
            where: { estado: String(estado) }
        });
        const bitacoraLimCFV = await prisma.bitacoraLimpiezaCribasFV.findMany({
            where: { estado: String(estado) }
        });
        const bitacoraLimAl = await prisma.bitacoraLimpiezaAlmacenes.findMany({
            where: { estado: String(estado) }
        });
        const bitacoraLimEnt = await prisma.bitacoraLimpiezaEntregas.findMany({
            where: { estado: String(estado) }
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

// export const getBitacorasNoRevisadas = async (req, res) => {
//     try {
//         const bitacoraExt = await prisma.bitacoraExtintores.findMany({
//             where: { estado: String(estado) }
//         });
//         const bitacoraAliCom = await prisma.bitacoraLimpiezaAlimentoCompartidos.findMany({
//             where: { estado: String(estado) }
//         });
//         const bitacoraTemp = await prisma.bitacoraTemperaturas.findMany({
//             where: { estado: String(estado) }
//         });
//         const bitacoraLimRec = await prisma.bitacoraLimpiezaRecibos.findMany({
//             where: { estado: String(estado) }
//         });
//         const bitacoraLimEmp = await prisma.bitacoraLimpiezaEmpaques.findMany({
//             where: { estado: String(estado) }
//         });
//         const bitacoraLimCFV = await prisma.bitacoraLimpiezaCribasFV.findMany({
//             where: { estado: String(estado) }
//         });
//         const bitacoraLimAl = await prisma.bitacoraLimpiezaAlmacenes.findMany({
//             where: { estado: String(estado) }
//         });
//         const bitacoraLimEnt = await prisma.bitacoraLimpiezaEntregas.findMany({
//             where: { estado: String(estado) }
//         });
//         const combinedResult = [
//             ...bitacoraExt,
//             ...bitacoraAliCom,
//             ...bitacoraTemp,
//             ...bitacoraLimRec,
//             ...bitacoraLimEmp,
//             ...bitacoraLimCFV,
//             ...bitacoraLimAl,
//             ...bitacoraLimEnt];
//         res.json(combinedResult)
//     } catch (error) {
//         if (process.env.NODE_ENV !== 'test') {
//             console.log('Error! Entry not found:', error)
//         }
//     }
// }

// export const getBitacorasEnRevision = async (req, res) => {
//     try {
//         const bitacoraExt = await prisma.bitacoraExtintores.findMany({
//             where: { estado: String(estado) }
//         });
//         const bitacoraAliCom = await prisma.bitacoraLimpiezaAlimentoCompartidos.findMany({
//             where: { estado: String(estado) }
//         });
//         const bitacoraTemp = await prisma.bitacoraTemperaturas.findMany({
//             where: { estado: String(estado) }
//         });
//         const bitacoraLimRec = await prisma.bitacoraLimpiezaRecibos.findMany({
//             where: { estado: String(estado) }
//         });
//         const bitacoraLimEmp = await prisma.bitacoraLimpiezaEmpaques.findMany({
//             where: { estado: String(estado) }
//         });
//         const bitacoraLimCFV = await prisma.bitacoraLimpiezaCribasFV.findMany({
//             where: { estado: String(estado) }
//         });
//         const bitacoraLimAl = await prisma.bitacoraLimpiezaAlmacenes.findMany({
//             where: { estado: String(estado) }
//         });
//         const bitacoraLimEnt = await prisma.bitacoraLimpiezaEntregas.findMany({
//             where: { estado: String(estado) }
//         });
//         const combinedResult = [
//             ...bitacoraExt,
//             ...bitacoraAliCom,
//             ...bitacoraTemp,
//             ...bitacoraLimRec,
//             ...bitacoraLimEmp,
//             ...bitacoraLimCFV,
//             ...bitacoraLimAl,
//             ...bitacoraLimEnt];
//         res.json(combinedResult)
//     } catch (error) {
//         if (process.env.NODE_ENV !== 'test') {
//             console.log('Error! Entry not found:', error)
//         }
//     }
// }
