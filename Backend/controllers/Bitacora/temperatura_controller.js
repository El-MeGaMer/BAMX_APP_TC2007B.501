import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient


//-----------------------------------------------------

//Funciones Especificas


//Llenar bitacora rutinaria de Temperaturas (Actualizarla)
export const updateTemperaturas = async (req, res) => {
    
    try {

        //Info from route
        const {idLog} = req.params;
        const data = req.body;

        const limitesTemperaturas = {
            "cuartoFrio1_low": 0,
            "cuartoFrio1_high": 5,
            "cuartoFrio2_low": 5,
            "cuartoFrio2_high": 10,
            "camaraConservacionB_low": -9,
            "camaraConservacionB_high": 0,
            "camaraConservacionC_low": -9,
            "camaraConservacionC_high": 0,
        }

        let response
        let problemas = []
        
        //Current date
        const currentDate = new Date()

        const convertedData = {}
        Object.keys(data).forEach((key) => {
            const value = data[key];
            convertedData[key] = typeof value === 'string' ? parseInt(value, 10) : value;
        });

        //Extraer valor de estado de bitacora
        const seeBitStatus = await prisma.bitacoraTemperaturas.findFirst({
            where: { id: Number(idLog)},
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
            const update = await prisma.bitacoraTemperaturas.update({
                where: {id: Number(idLog)},
                data: {...convertedData, estado: 'revisado'}
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
                    titulo: "Bitacora de Temperaturas | " + currentDate.toISOString().slice(0, 10),
                    descripcion: "Bitacora del area de Temperaturas del dia " + currentDate.toISOString().slice(0, 10) + " ya fue revisada",
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

            //Checamos los valores
            console.log(update)

            if (update.cuartoFrio1 <= limitesTemperaturas.cuartoFrio1_low || update.cuartoFrio1 >= limitesTemperaturas.cuartoFrio1_high){
                problemas.push("valor de cuarto Frio 1 fuera de rango")
                //console.log("valor de cuarto Frio 1 fuera de rango")
            }

            if (update.cuartoFrio2 <= limitesTemperaturas.cuartoFrio2_low || update.cuartoFrio2 >= limitesTemperaturas.cuartoFrio2_high){
                problemas.push("valor de cuarto Frio 2 fuera de rango")
                //console.log("valor de cuarto Frio 2 fuera de rango")
            }

            if (update.camaraConservacionB <= limitesTemperaturas.camaraConservacionB_low || update.camaraConservacionB >= limitesTemperaturas.camaraConservacionB_high){
                problemas.push("valor de camara B fuera de rango")
                //console.log("valor de camara B fuera de rango")
            }

            if (update.camaraConservacionC <= limitesTemperaturas.camaraConservacionC_low || update.camaraConservacionC >= limitesTemperaturas.camaraConservacionC_high){
                problemas.push("valor de camara C fuera de rango")
                //console.log("valor de camara C fuera de rango")
            }

            //EN CASO DE QUE SE REGISTREN DATOS FUERA DE ORDEN
            if (problemas.length != 0){

                let descripcion = ""

                problemas.forEach(element => {
                    descripcion += element
                    descripcion += " "
                });

                const incidente = await prisma.bitacoraIncidentes.create({

                    data: {
                        idUsuarioEmisor: update.idUsuarioEmisor,
                        idArea: 7,
                        nombre: "Problemas con limites de temperatura",
                        fechaHora: currentDate,
                        descripcion: descripcion,
                        estado: "noRevisado"
                    }

                })
                console.log(incidente)
            }
            
            response = { status: 'success', message: 'La bitacora ha sido enviada' }

        }

        res.json(response)
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log(error)
        }
        res.json({ status: 'error', message: 'Hubo un error al mandar la bitacora'})
    }
}

// Obtener datos por medio de idLog
export const getTemperaturas = async (req, res) => {
    try {
        const {idLog} = req.params
        const result = await prisma.bitacoraTemperaturas.findUnique({
            where: {id: Number(idLog)}
        })
        res.json(result)
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Entry not found:', error)
        }
    }
}