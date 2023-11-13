import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

//-----------------------------------------------------
//CRUD Basico

//Crear bitacora de Entrega
export const postEntrega = async (req, res) => {
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

//Actualizar bitacora de Entrega
export const updateEntrega = async (req, res) => {

}

//obtener todas las bitacoras de Entrega
export const getAllEntrega = async (req, res) => {

}

//obtener bitacora de Entrega por su ID
export const getEntregaByID = async (req, res) => {

}

//borrar entrada de bitacora de Entrega
export const delEntrega = async (req, res) => {

}

//-----------------------------------------------------

//Funciones Especificas


//Llenar bitacora rutinaria de Entrega (Actualizarla)
export const fillEntrega = async (req, res) => {

    const {
        id,
        pisos,
        cuartosFrios, 
        basculas, 
        racks, 
        cortinas,  
        rampas,
        patines,  
        observaciones,
    } = req.body;
    console.log("hola")
    console.log(req.body)
        


    try {
        
        
        //Actualizar bitacora
        const result = await prisma.bitacoraLimpiezaEntregas.update({
            where: {id: id},
            data: {
                id,
                pisos,
                cuartosFrios, 
                basculas, 
                racks, 
                cortinas,  
                rampas,
                patines,  
                observaciones,
                estado: "send"
            }


        })
        res.json(result)
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Entry NOT found')
        }
    }
}