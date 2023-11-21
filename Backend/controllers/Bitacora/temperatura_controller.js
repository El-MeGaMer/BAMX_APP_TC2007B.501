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
            "cuartoFrio1_low": 1,
            "cuartoFrio1_high": 20,
            "cuartoFrio2_low": 1,
            "cuartoFrio2_high": 20,
            "camaraConservacionB_low": 1,
            "camaraConservacionB_high": 20,
            "camaraConservacionC_low": 1,
            "camaraConservacionC_high": 20,
        }

        let response
        let problemas = []
        
        //Current date
        const currentDate = new Date()

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

            response = "Esta bitacora ya fue revisada"

        }

        //Cuando el estado esta en no Revisado
        //Actualizamos la bitacora, creamos la notificacion
        //y respondemos que se si se pudo enviar exitosamente
        else if (seeBitStatus.estado == "noRevisado") {

            //Actualizamos la bitacora
            const update = await prisma.bitacoraTemperaturas.update({
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

            if (update.cuartoFrio1 < limitesTemperaturas.cuartoFrio1_low || update.cuartoFrio1 > limitesTemperaturas.cuartoFrio1_high){
                problemas.push("valor de cuarto Frio 1 fuera de rango")
                //console.log("valor de cuarto Frio 1 fuera de rango")
            }

            if (update.cuartoFrio2 < limitesTemperaturas.cuartoFrio2_low || update.cuartoFrio2 > limitesTemperaturas.cuartoFrio2_high){
                problemas.push("valor de cuarto Frio 2 fuera de rango")
                //console.log("valor de cuarto Frio 2 fuera de rango")
            }

            if (update.camaraConservacionB < limitesTemperaturas.camaraConservacionB_low || update.camaraConservacionB > limitesTemperaturas.camaraConservacionB_high){
                problemas.push("valor de camara B fuera de rango")
                //console.log("valor de camara B fuera de rango")
            }

            if (update.camaraConservacionC < limitesTemperaturas.camaraConservacionC_low || update.camaraConservacionC > limitesTemperaturas.camaraConservacionC_high){
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
            


            response = 'Enviado exitosamente'

        }


        


        res.json(response)
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log(error)
        }
    }
}