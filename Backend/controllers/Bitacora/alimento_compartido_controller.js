import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

//-----------------------------------------------------

//Funciones Especificas


//Llenar bitacora rutinaria de Alimento Compartido (Actualizarla)
export const updateAlimentoCompartido = async (req, res) => {
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