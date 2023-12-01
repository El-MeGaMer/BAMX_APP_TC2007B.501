import { PrismaClient } from "@prisma/client"
import multer from "multer"

const prisma = new PrismaClient

// Controllers for Incidentes Bitacoras, for more 
// information see file "/Backend/prisma/schema.prima"

//main controller ----------------------

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

export const createIncidente = async (req, res) => {
    try {
        const {id} = req.params;
        const fechaActual = new Date().toISOString()
        const { 
            area,
            descripcion
        } = req.body
        
        // finds area id from name
        const seeArea = await prisma.areas.findFirst({
            where: { nombreArea: area }
        })

        // Creates notification
        const createNotificacion = await prisma.notificaciones.create({
            data: {
                titulo: "Incidente-" + area + "-" + fechaActual.slice(0, 10),
                descripcion,
                fechaHora: fechaActual
            }
        })

        // The next chunk of code delivers the notification to the respective users
        const usuariosConMismoId = await prisma.usuarios.findMany({
            where: { idRol: 2 }
        })

        console.log(usuariosConMismoId);

        const usuarioConMismoId = await prisma.areasUsuario.findFirst({
            where: { idArea: seeArea.id }
        })

        console.log(usuarioConMismoId);

        // Makes the link to all the users found with the id related to the role "coordinador"
        // and links them to the notification
        if (usuariosConMismoId.length > 0) {
            usuariosConMismoId.forEach(async (usuario) => {
                await prisma.notificacionesUsuarios.create({
                data: {
                    idNotificacion: createNotificacion.id,
                    idUsuario: usuario.id,
                    estado: "noRevisado"
                }
                })
            })
        }

        // Links the notification to the user in charge of the respective area
        if (usuarioConMismoId.length > 0) {
            usuarioConMismoId.forEach(async (usuario) => {
                await prisma.notificacionesUsuarios.create({
                data: {
                    idNotificacion: createNotificacion.id,
                    idUsuario: usuario.id,
                    estado: "noRevisado"
                }
                })
            })
        }


        // Creates the log for "Incidentes"
        const result = await prisma.bitacoraIncidentes.create({
            data: {
                idUsuarioEmisor: Number(id),
                idArea: seeArea.id,
                nombre: "Incidente-" + area + "-" + fechaActual.slice(0, 10),
                fechaHora: new Date(),
                descripcion,
                imagen: Buffer.from(req.file.buffer),
                estado: "noRevisado"
            }
        })
        console.log(area)

        res.json({ status: 'success', message: 'El reporte ha sido enviado' })

    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Could not add the entry:', error)
        }
        res.json({ status: 'error', message: 'Hubo un error al mandar la bitacora'})
    }
}

export const getIncidentes = async (req, res) => {
    try {
        const {idArea} =req.params
        const result = await prisma.bitacoraIncidentes.findMany({
            where :{idArea: Number(idArea)},
            select: {
                idUsuarioEmisor: true,
                nombre: true,
                fechaHora: true,
                descripcion: true,
                imagen: true
            }
        })
        res.json(result)
    } catch(error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Could not add the entry:', error)
        }
    }
}

// Complementary controllers -----------------------------

export const deleteIncidenteById = async (req, res) => {
    try {
        const {id} = req.params
        const result = await prisma.bitacoraIncidentes.delete({
            where: {id: Number(id)}
        })
        res.json(result)
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Could not delete entry')
        }
    } 
}