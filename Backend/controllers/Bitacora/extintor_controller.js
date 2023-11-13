import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

//-----------------------------------------------------
//CRUD Basico

//Crear bitacora de Extinctor
export const postExtintor = async (req, res) => {
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

//Actualizar bitacora de Extinctor
export const updateExtintor = async (req, res) => {

}

//obtener todas las bitacoras de Extinctor
export const getAllExtinctor = async (req, res) => {

}

//obtener bitacora de Extinctor por su ID
export const getExtinctorByID = async (req, res) => {

}

//borrar entrada de bitacora de Extinctor
export const delExtinctor = async (req, res) => {

}

//-----------------------------------------------------

//Funciones Especificas


//Llenar bitacora rutinaria de extinctor (Actualizarla)
export const fillExtinctor = async (req, res) => {

    
        const {
            id,
            capacidad,
            manometro, 
            estadoFisico, 
            mangueras, 
            seguro, 
            etiquetas, 
            holograma,
            ultimaRevision, 
            proximaRecarga, 
            observaciones,
        } = req.body

    try {
        console.log(req.body)
        console.log("paso 0")
        //obtener id de recordatorio actual
        const recordatorioID = await prisma.bitacoraExtintores.findUnique({
            where: { id: id },
            select: {
                idRecordatorio: true,
            },
          });
        console.log(recordatorioID)
        console.log("paso 1")
        //Crer nuevo recordatorio
        const newRecordatorio = await prisma.recordatorios.create({
            data: {
              nombre: "bitacora",
              descripcion: "Bitacora de Extintores lista para revision",
              horaInicial: "2023-11-11T12:30:45.123Z",
              horaFinal: "2023-11-11T12:30:45.123Z"
            },
          });
          console.log(newRecordatorio)
          console.log("paso 2")
        //Actualizar recordatorio actual
        const updateRecordatorio = await prisma.recordatorios.update({
            where: {id: recordatorioID.idRecordatorio},
            data: {
                descripcion: "xd",
            },


        })
        console.log(updateRecordatorio)
        console.log("paso 3")
        //Actualizar bitacora
        const result = await prisma.example.update({
            where: {id: id},
            data: {
                idRecordatorio: newRecordatorio.id,
                capacidad,
                manometro, 
                estadoFisico, 
                mangueras, 
                seguro, 
                etiquetas, 
                holograma,
                ultimaRevision, 
                proximaRecarga, 
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