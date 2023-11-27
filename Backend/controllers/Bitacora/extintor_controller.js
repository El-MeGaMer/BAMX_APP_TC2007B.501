import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient


//-----------------------------------------------------

//Funciones Especificas


//Llenar bitacora rutinaria de extinctor (Actualizarla)
export const updateExtinctor = async (req, res) => {
    
    try {

        //Info from route
        const {idLog} = req.params;
        const data = req.body;

        let response
        let problemas = []
        
        //Current date
        const currentDate = new Date()

        //Extraer valor de estado de bitacora
        const seeBitStatus = await prisma.bitacoraExtintores.findFirst({
            where: { id: Number(idLog)},
            select:{
                estado: true
            }
        })


        //Cuando el estado ya esta en revisado
        //Solo mandamos una respuesta de que ya se reviso
        if (seeBitStatus.estado == "revisado"){

            response = "Esta bitacora ya fue revisada"

        }

        //Cuando el estado esta en no Revisado
        //Actualizamos la bitacora, creamos la notificacion
        //y respondemos que se si se pudo enviar exitosamente
        else if (seeBitStatus.estado == "noRevisado") {

            //Actualizamos la bitacora
            const update = await prisma.bitacoraExtintores.update({
                where: {id: Number(idLog)},
                data: {...data, estado: 'revisado'}
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

            //Checar errores/problemas

            if (update.capacidad === false) {
                problemas.push("capacidad")
            }
            if (update.manometro === false) {
                problemas.push("manometro")
            }
            if (update.estadoFisico === false) {
                problemas.push("estado Fisico")
            }
            if (update.mangueras === false) {
                problemas.push("mangueras")
            }
            if (update.seguro === false) {
                problemas.push("seguro")
            }
            if (update.etiquetas === false) {
                problemas.push("etiquetas")
            }
            if (update.holograma === false) {
                problemas.push("holograma")
            }

            //EN CASO DE QUE SE REGISTREN DATOS FUERA DE ORDEN
            if (problemas.length != 0){

                let descripcion = "Bitacora del area de Extintores del dia " + currentDate.toISOString().slice(0, 10) + " ya fue revisada y contiene problemas con los siguientes elementos: "

                problemas.forEach(element => {
                    descripcion += element
                    descripcion += " "
                });

                //crear notif
                    
                const notification = await prisma.notificaciones.create({
                    data: {
                        titulo: "Bitacora de Extintores con Problemas | " + currentDate.toISOString().slice(0, 10),
                        descripcion: descripcion,
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


            }

            else {
                    //Creamos la notificacion
                const notification = await prisma.notificaciones.create({
                    data: {
                        titulo: "Bitacora de Extintores | " + currentDate.toISOString().slice(0, 10),
                        descripcion: "Bitacora del area de Extintores del dia " + currentDate.toISOString().slice(0, 10) + " ya fue revisada",
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
            }
            
            response = 'Enviado exitosamente'

        }

        res.json(response)
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log(error)
        }
    }
}

// Obtener datos por medio de idLog
export const getExtintor = async (req, res) => {
    try {
        const {idLog} = req.params
        const result = await prisma.bitacoraExtintores.findUnique({
            where: {id: Number(idLog)}
        })
        res.json(result)
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Entry not found:', error)
        }
    }
}