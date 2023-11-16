import { PrismaClient } from "@prisma/client"
import multer from "multer"

const prisma = new PrismaClient

// Controllers for Incidentes Bitacoras, for more 
// information see file "/Backend/prisma/schema.prima"

//main controllers ----------------------

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

export const createIncidente = async (req, res) => {
    try {
        const fechaActual = new Date().toISOString()
        const { 
            area,
            descripcion
        } = req.body
        
        const seeArea = await prisma.areas.findFirst({
            where: { nombreArea: area }
        })

        const createNotificacion = await prisma.notificaciones.create({
            data: {
                titulo: "Incidente-" + area + "-" + fechaActual.slice(0, 10),
                descripcion,
                fechaHora: fechaActual,
                estado: "NoVisto"
            }
        })

        const usuariosConMismoId = await prisma.usuarios.findMany({
            where: { idRol: 2 }
        })

        const usuarioConMismoId = await prisma.usuarios.findFirst({
            where: { idRol: seeArea.id }
        })

        if (usuariosConMismoId.length > 0) {
            usuariosConMismoId.forEach(async (usuario) => {
                await prisma.notificacionesUsuarios.create({
                data: {
                    idNotificacion: createNotificacion.id,
                    idUsuario: usuario.id
                },
                })
            })
        }

        const areaResponsable = await prisma.notificacionesUsuarios.create({
            data: {
                idNotificacion: createNotificacion.id,
                idUsuario: usuarioConMismoId.id
            }
        })

        const result = await prisma.bitacoraIncidentes.create({
            data: {
                idUsuarioEmisor: usuarioConMismoId.id,
                idArea: seeArea.id,
                nombre: "Incidente-" + area + "-" + fechaActual.slice(0, 10),
                fechaHora: new Date(),
                descripcion,
                imagen: Buffer.from(req.file.buffer),
                estado: "noRevisado"
            }
        })

        res.json(result)

    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Could not add the entry:', error)
        }
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