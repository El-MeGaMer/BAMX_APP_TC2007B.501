import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

export const postBitacorasMadrugada = async () => {
    try {
        /*const { title, content, name } = req.body
        const result = await prisma.example.create({
            data: {
                title, 
                content, 
                name
                //img
            }
        })
        res.json(result)*/
        //Recordatorio: Son varios extintores
        /*const bitacoraExtintores = await prisma.bitacoraExtintores.create({
            data:{
                nombre: "Bimi"
            }
        })*/
        //La de incidentes no cuenta
        const bitacoraLimpiezaAlimentoCompartido = await prisma.bitacoraLimpiezaAlimentoCompartidos.create({
            nombre: "",
            dia: 0,
            pisos: null,
            cuartosFrios: null,
            refrigeradores: null,
            congeladores: null,
            racks: null,
            cortinas: null,
            patines: null,
            basculas: null,
            estado: "en revision"
        })
        console.log("CB Limpieza Alimento Compartido")
        const bitacoraLimpiezaRecibos = await prisma.bitacoraLimpiezaRecibos.create({
            
        })
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Could not add the entry:', error)
        }
    }
}