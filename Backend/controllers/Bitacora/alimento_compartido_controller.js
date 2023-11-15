import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

//-----------------------------------------------------
//CRUD Basico

//Crear bitacora de Alimento Compartido
export const postAlimentoCompartido = async (req, res) => {
    const { idUsuarioEmisor, idArea, nombre, capacidad,
        manometro, estadoFisico, mangueras, seguro, etiquetas, holograma,
        ultimaRevision, proximaRecarga, observaciones } = req.body
    try {
        
        console.log(req.body)
      
          const newRecordatorio = await prisma.recordatorios.create({
            data: {
              nombre: "bitacora",
              descripcion: "Bitacora de Extintores Creada",
              horaInicial: "2023-11-11T12:30:45.123Z",
              horaFinal: "2023-11-11T12:30:45.123Z"
            },
          });

        const result = await prisma.bitacoraExtintores.create({
            data: {
                idUsuarioEmisor,
                idArea,
                idRecordatorio: newRecordatorio.id,
                nombre, capacidad,
                manometro, estadoFisico, mangueras, seguro, etiquetas, holograma,
                ultimaRevision, proximaRecarga, observaciones, 
                estado: "Created"
            }
        })

        res.json(result)

        
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Could not add the entry:', error)
        }
    }
}

//Actualizar bitacora de Alimento Compartido
export const updateAlimentoCompartido = async (req, res) => {

}

//obtener todas las bitacoras de Alimento Compartido
export const getAllAlimentoCompartido = async (req, res) => {

}

//obtener bitacora de Alimento Compartido por su ID
export const getAlimentoCompartidoByID = async (req, res) => {

}

//borrar entrada de bitacora de Alimento Compartido
export const delAlimentoCompartido = async (req, res) => {

}

//-----------------------------------------------------

//Funciones Especificas


//Llenar bitacora rutinaria de Alimento Compartido (Actualizarla)
export const fillAlimentoCompartido = async (req, res) => {
    const {id} = req.params;
    const data = req.body;

    try {
        
        //Actualizar bitacora
        const result = await prisma.bitacoraLimpiezaAlimentoCompartidos.update({
            where: {id: Number(id)},
            data: data
        })

        if (result.estado == "hola"){

            const notificacion = await prisma.notificaciones.create({

                data: {

                    titulo: "Bitacora LLenada" ,
                    descripcion: "Bitacora lista para revision por Supervisor",

                }

            })
        }

        res.json(result)
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Entry NOT found')
        }
    }
}