import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient


//-----------------------------------------------------

//Funciones Especificas


//Llenar bitacora rutinaria de extinctor (Actualizarla)
export const updateExtinctor = async (req, res) => {

    const {id} = req.params;
    const data = req.body;
    
    try {
        
        //Actualizar bitacora
        const result = await prisma.bitacoraExtintores.update({
            where: {id: Number(id)},
            data: data


        })
        res.json(result)
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Entry NOT found')
        }
    }
}