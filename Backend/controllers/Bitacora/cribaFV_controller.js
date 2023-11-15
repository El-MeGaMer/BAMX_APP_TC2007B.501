import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

//-----------------------------------------------------
//CRUD Basico

//Crear bitacora de criba frutas y verduras
export const postCribaFV = async (req, res) => {
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

//Actualizar bitacora de criba frutas y verduras
export const updateCribaFV = async (req, res) => {

}

//obtener todas las bitacoras de criba frutas y verduras
export const getAllCribaFV = async (req, res) => {

}

//obtener bitacora de criba frutas y verduras por su ID
export const getCribaFVByID = async (req, res) => {

}

//borrar entrada de bitacora de criba frutas y verduras
export const delCribaFV = async (req, res) => {

}

//-----------------------------------------------------

//Funciones Especificas


//Llenar bitacora rutinaria de criba frutas y verduras (Actualizarla)
export const fillCribaFV = async (req, res) => {

    const {id} = req.params;
    const data = req.body;
        


    try {
        

        //Actualizar bitacora
        const result = await prisma.bitacoraLimpiezaCribasFV.update({
            where: {id: Number(id)},
            data: data


        })
        res.json(result)
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Entry NOT found')
            console.log(error)
        }
    }
}