import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

//-----------------------------------------------------
//CRUD Basico

//Crear bitacora de Temperaturas
export const postTemperaturas = async (req, res) => {
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

//Actualizar bitacora de Temperaturas
export const updateTemperaturas = async (req, res) => {

}

//obtener todas las bitacoras de Temperaturas
export const getAllTemperaturas = async (req, res) => {

}

//obtener bitacora de Temperaturas por su ID
export const getTemperaturasByID = async (req, res) => {

}

//borrar entrada de bitacora de Temperaturas
export const delTemperaturas = async (req, res) => {

}

//-----------------------------------------------------

//Funciones Especificas


//Llenar bitacora rutinaria de Temperaturas (Actualizarla)
export const fillTemperaturas = async (req, res) => {

    const {
        id,
        cuartoFrio1,
        cuartoFrio2, 
        camaraConservacionB, 
        camaraConservacionC, 
        observaciones,
    } = req.body;
    console.log("hola")
    console.log(req.body)
        


    try {
        
        const utctime = new Date().toISOString();

        // Convert to local time using toLocaleString
        const localDate = new Date(utctime);

        // Get the day of the week (0-6, where 0 is Sunday and 6 is Saturday)
        const year = localDate.getFullYear();
        const month = localDate.getMonth() + 1;
        const dayOfWeek = localDate.getDate();
        const hour = localDate.getHours();
        const min = localDate.getMinutes();

        //console.log(`Day of the week: ${dayOfWeek}`);
        const nombre = "Bitacora de Temperaturas " + dayOfWeek + "/" + month + "/" + year + " " + hour + ":" + min

        //Actualizar bitacora
        const result = await prisma.bitacoraTemperaturas.update({
            where: {id: id},
            data: {
                id,
                nombre: nombre,
                cuartoFrio1,
                cuartoFrio2, 
                camaraConservacionB, 
                camaraConservacionC, 
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