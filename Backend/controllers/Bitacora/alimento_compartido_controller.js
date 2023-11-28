import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

//-----------------------------------------------------

//Funciones Especificas


//Llenar bitacora rutinaria de Alimento Compartido (Actualizarla)
export const updateAlimentoCompartido = async (req, res) => {
    
    try {

        //Info from route
        const {idLog, idUser} = req.params;
        const data = req.body;

        let response
        
        //Current date
        const currentDate = new Date()

        //Extraer valor de estado de bitacora
        const seeBitStatus = await prisma.bitacoraLimpiezaAlimentoCompartidos.findFirst({
            where: { id: parseInt(idLog)},
            select:{
                estado: true
            }
        })


        //Cuando el estado ya esta en revisado
        //Solo mandamos una respuesta de que ya se reviso
        if (seeBitStatus.estado == "revisado"){

            response = { status: 'error', message: 'La bitacora ya fue revisada' }

        }

        //Cuando el estado esta en no Revisado
        //Actualizamos la bitacora, creamos la notificacion
        //y respondemos que se si se pudo enviar exitosamente
        else if (seeBitStatus.estado == "noRevisado") {

            //Actualizamos la bitacora
            const update = await prisma.bitacoraLimpiezaAlimentoCompartidos.update({
                where: {id: parseInt(idLog)},
                data: {...data, estado: 'enRevision'}
            })


            //Obtenemos los roles de los coordinadores
            const idRolUsers = await prisma.usuarios.findMany({
                where: {
                    idRol: 2 
                },
                select: {
                    id: true
                }
            })

            //Creamos la notificacion
            const notification = await prisma.notificaciones.create({
                data: {
                    titulo: "Bitacora de Alimento Compartido | " + currentDate.toISOString().slice(0, 10),
                    descripcion: "Bitacora del area de Alimento Compartido del dia " + currentDate.toISOString().slice(0, 10) + " está lista para revisión",
                    fechaHora: currentDate 
                }
            })

            //Creamos la relacion entre notificacion y coordinadores
            
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
            

            response = { status: 'success', message: 'La bitacora ha sido enviada' }

        }


        //Cuando el estado esta en Revision
        //Se actualiza la bitacora
        //y respondemos que si se pudo actualizar exitosamente
        else if (seeBitStatus.estado == "enRevision") {

            const update = await prisma.bitacoraLimpiezaAlimentoCompartidos.update({
                where: {id: parseInt(idLog)},
                data: {estado: 'revisado', idUsuarioSupervisor: parseInt(idUser)}
            })

            //res.json(update)
            response = { status: 'success', message: 'La bitacora ha sido aprovada' }
        }


        res.json(response)
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log(error)
        }
        res.json({ status: 'error', message: 'Hubo un error al mandar la bitacora'})
    }
}