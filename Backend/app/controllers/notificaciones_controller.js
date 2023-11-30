import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

export async function getNotificacionesUsuario(req, res){
    try {
        const {id} = req.params
        const result = await prisma.notificaciones.findMany({
            where :{
                usuarios: {
                    some: {
                        idUsuario: parseInt(id)
                    }
                }
            },
            select: {
                id: true,
                titulo: true,
                descripcion: true,
                fechaHora: true,
            }
        })
        res.json(result)
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Could not add the entry:', error)
        }
    }
}

//Fetch de las notificaciones para el mail
export async function fetchNotifications(startTime, endTime) {
    try {
        const notifications = await prisma.notificaciones.findMany({
            where: {
                fechaHora: {
                    lte: endTime,
                    gte: startTime,
                }
            }
            ,select: {
                titulo: true,
                descripcion: true,
                usuarios: {
                    select: {
                        usuario: {
                            select:
                            {
                                correo: true,
                            }
                        }
                    }
                }
            }
        });
    return notifications;
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Could not add the entry:', error)
        }
    }
  }