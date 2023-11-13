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

        //TODO:
        //CREAR RECORDATORIOS
        //VERIFICACION DE USUARIOS

        // MAKE DATESTRING FOR NAMES
        // Convert to local time using toLocaleString
        // Get the day of the week (0-6, where 0 is Sunday and 6 is Saturday)
        const year = localDate.getFullYear();
        const month = localDate.getMonth() + 1;
        const dayOfWeek = localDate.getDate();
        const dateString = dayOfWeek + "/" + month + "/" + year

        //MAKE 4 BITACORAS DE TEMPERATURA
        for(i = 0; i < 4; i++){
            const horaString = "";
            if(i==0){ hora = "7am" }
            if(i==1){ hora = "11am" }
            if(i==2){ hora = "3pm" }
            if(i==3){ hora = "6pm" }
            const bitacoraTemperatura = await prisma.bitacoraTemperaturas.create({
                data: {
                    idUsuarioEmisor: 0,
                    idUsuarioSupervisor: 1,
                    nombre: "Bitacora de temperatura " + horaString + " " + dateString,
                     cuartoFrio1: 0,
                     cuartoFrio2: 0,
                     camaraConservacionB: 0,
                     camaraConservacionC: 0,
                     observaciones: "",
                     estado: "en revision"
                }
            })
        }
   
        //MAKE THE REST OF THE BITACORAS
        const bitacoraLimpiezaAlimentoCompartido = await prisma.bitacoraLimpiezaAlimentoCompartidos.create({
            data: {
                nombre: "Bitacora de limpieza alimento compartido " + dateString,
                idUsuarioEmisor: 0,
                idUsuarioSupervisor: 1,
                idArea: 1,
                idRecordatorio: 1,
                dia: 0,
                pisos: null,
                cuartosFrios: null,
                refrigeradores: null,
                congeladores: null,
                racks: null,
                cortinas: null,
                patines: null,
                basculas: null,
                observaciones: "",
                estado: "en revision"
            }
        })
        console.log("CB Limpieza Alimento Compartido")
        const bitacoraLimpiezaRecibos = await prisma.bitacoraLimpiezaRecibos.create({
            data: {
                idUsuarioEmisor: 0,
                idUsuarioSupervisor: 1,
                idArea: 1,
                idRecordatorio: 1,
                nombre: "Bitacora de limpieza recibos " + dateString,
                dia: 0,
                areaArmado: null,
                areaRecibo: null,
                patio: null,
                rampas: null,
                cuartosFrios: null,
                congelador: null,
                transporte: null,
                observaciones: "",
                estado: "en revision"
            }
        })
        console.log("CB Limpieza Recibos")
        const bitacoraLimpiezaEmpaques = await prisma.bitacoraLimpiezaEmpaques.create({
            data: {
                idUsuarioEmisor: 0,
                idUsuarioSupervisor: 1,
                idArea: 1,
                idRecordatorio: 1,
                nombre: "Bitacora limpieza empaques " + dateString,
                dia: 0,
                pisos: null,
                mesas: null,
                selladores: null,
                basculas: null,
                rampas: null,
                estantes: null,
                bandejas: null,
                patines: null,
                observaciones: "",
                estado: "en revision"
            }
        })
        console.log("CB Limpieza Empaques")
        const bitacoraLimpiezaCribasFV = await prisma.bitacoraLimpiezaCribasFV.create({
            data: {
                idUsuarioEmisor: 0,
                idUsuarioSupervisor: 1,
                idArea: 1,
                idRecordatorio: 1,
                nombre: "Bitacora limpieza cribas FV " + dateString,
                dia: 0,
                pisos: null,
                mesas: null,
                patio: null,
                basculas: null,
                rampas: null,
                rejillas: null,
                patines: null,
                observaciones: "",
                estado: "en revision"
            }
        })
        console.log("CB Limpieza Cribas FV")
        const bitacoraLimpiezaAlmacenes = await prisma.bitacoraLimpiezaAlmacenes.create({
            data: {
                idUsuarioEmisor: 0,
                idUsuarioSupervisor: 1,
                idArea: 1,
                idRecordatorio: 1,
                nombre: "Bitacora limpieza almacenes " + dateString,
                dia: 0,
                pisos: null,
                pasillos: null,
                extintores: null,
                cuartosFrios: null,
                puertas: null,
                muros: null,
                racks: null,
                cortinas: null,
                coladeras: null,
                rejillas: null,
                montacargas: null,
                patines: null,
                observaciones: "",
                estado: "en revision"
            }
        })
        console.log("CB Limpieza Almacenes")
        const bitacoraLimpiezaEntregas = await prisma.bitacoraLimpiezaEntregas.create({
            data: {
                idUsuarioEmisor: 0,
                idUsuarioSupervisor: 1,
                idArea: 1,
                idRecordatorio: 1,
                nombre: "Bitacora de limpieza entregas " + dateString,
                dia: 0,
                pisos: null,
                cuartosFrios: null,
                basculas: null,
                racks: null,
                cortinas: null,
                rampas: null,
                patines: null,
                observaciones: "",
                estado: "en revision"
            }
        })
        console.log("CB Limpieza Entregas")
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Could not add the entry:', error)
        }
    }
}