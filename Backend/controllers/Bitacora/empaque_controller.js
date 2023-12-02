import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

// Controllers for Incidentes Bitacoras, for more 
// information see file "/Backend/prisma/schema.prima"

//main controller ----------------------

export const updateEmpaque = async (req, res) => {
    try {
        const {idLog, idUser}= req.params
        const newData = req.body
        const currentDate = new Date()

        const convertedData = {}
        Object.keys(newData).forEach((key) => {
            const value = newData[key]
            if (value === 1 || value === "true") {
                convertedData[key] = true
            } else if (value === 0 || value === "false") {
                convertedData[key] = false
            } else {
                convertedData[key] = value // Maintains original values if its not 1 or 0
            }
        })

        // See if there's a Log available for the day

        const seeBitStatus = await prisma.bitacoraLimpiezaEmpaques.findFirst({
            where: { id: parseInt(idLog) },
            select:{
                estado: true
            }
        })

        let result

        if (seeBitStatus.estado == 'noRevisado') {

            // Creates notification and update the "Bitacora Empaque" data
            const notification = await prisma.notificaciones.create({
                data: {
                    titulo: "Bitacora de empaque | " + currentDate.toISOString().slice(0, 10),
                    descripcion: "Bitacora del area de empaque del dia " + currentDate.toISOString().slice(0, 10) + " está lista para revisión",
                    fechaHora: currentDate 
                }
            })

            // Finds all the users with "Coordinador" role
            
            const idRolUsers = await prisma.usuarios.findMany({
                where: {
                    idRol: 2 
                },
                select: {
                    id: true
                }
            })

            // Make all the relations of "notificacionesUsuarios" with the users with the "coordinador" role
    
            const createRelation = idRolUsers.map(async (idUserRol) => {
                await prisma.notificacionesUsuarios.create({
                    data: {
                        idNotificacion: notification.id,
                        idUsuario: idUserRol.id,
                        estado: 'noRevisado' 
                    }
                })
            })
    
            await Promise.all(createRelation)

            await prisma.bitacoraLimpiezaEmpaques.update({
                where: {id: parseInt(idLog)},
                data: {...convertedData, estado: 'enRevision'}
            })

            result = { status: 'success', message: 'La bitacora ha sido enviada' }

            // In order to prevent further changes to the logs itself
            // this stops the user from making changes
        } else if (seeBitStatus.estado == 'revisado') {

            result = { status: 'error', message: 'La bitacora ya fue revisada' }

            // Signature or checkmark for the role "Coordinador"
        } else if (seeBitStatus.estado == 'enRevision') {

            await prisma.bitacoraLimpiezaEmpaques.update({
                where: {id: parseInt(idLog)},
                data: {...convertedData, estado: 'revisado', idUsuarioSupervisor: parseInt(idUser) }
            })

            result = { status: 'success', message: 'La bitacora ha sido aprovada' }
        }

        res.json(result)

    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Entry not found')
        }
        res.json({ status: 'error', message: 'Hubo un error al mandar la bitacora'})
    }
}

// Obtener datos por medio de idLog
export const getEmpaque = async (req, res) => {
    try {
        const {idLog} = req.params
        const result = await prisma.bitacoraLimpiezaEmpaques.findUnique({
            where: {id: Number(idLog)}
        })
        res.json(result)
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Entry not found:', error)
        }
    }
}
// Complementary controllers ------------------------