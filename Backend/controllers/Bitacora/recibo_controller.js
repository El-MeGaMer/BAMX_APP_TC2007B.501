import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

// Controllers for Incidentes Bitacoras, for more 
// information see file "/Backend/prisma/schema.prima"

//main controllers ----------------------

export const updateRecibo = async (req, res) => {
    try {
        const {idLog, idUser}= req.params
        const newData = req.body
        
        const currentDate = new Date()

        // See if there's a Log available for the day

        const seeBitStatus = await prisma.bitacoraLimpiezaRecibos.findFirst({
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

            await prisma.bitacoraLimpiezaRecibos.update({
                where: {id: parseInt(idLog)},
                data: {...newData, estado: 'enRevision'}
            })

            result = 'Entry sent'

        } else if (seeBitStatus.estado == 'revisado') {

            result = 'Log already reviewed'

        } else if (seeBitStatus.estado == 'enRevision') {

            await prisma.bitacoraLimpiezaRecibos.update({
                where: {id: parseInt(idLog)},
                data: {...newData, estado: 'revisado', idUsuarioSupervisor: parseInt(idUser) }
            })

            result = 'Entry sent'
        }

        res.json(result)

    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Entry not found')
        }
        res.status(500).json({ error: 'Error' })
    }
}

// Complementary controllers ------------------------
