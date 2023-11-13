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

    const {
        id,
        pisos,
        cuartosFrios, 
        refrigeradores, 
        congeladores, 
        racks,  
        cortinas,
        patines, 
        basculas, 
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

        //console.log(`Day of the week: ${dayOfWeek}`);
        const nombre = "Bitacora de AC " + dayOfWeek + "/" + month + "/" + year

        //Actualizar bitacora
        const result = await prisma.bitacoraLimpiezaAlimentoCompartidos.update({
            where: {id: id},
            data: {
                dia: dayOfWeek,
                fechaHora: utctime,
                nombre: nombre,
                pisos,
                cuartosFrios, 
                refrigeradores, 
                congeladores, 
                racks,  
                cortinas,
                patines, 
                basculas, 
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