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
        //VERIFICACION DE USUARIOS

        // MAKE DATESTRING FOR NAMES
        // Convert to local time using toLocaleString
        const localDate = new Date(utctime);
        // Get the day of the week (0-6, where 0 is Sunday and 6 is Saturday)
        const year = localDate.getFullYear();
        const month = localDate.getMonth() + 1;
        const dayOfWeek = localDate.getDate();
        const dateString = dayOfWeek + "/" + month + "/" + year

        initTime = localDate.replace(hour=4, minute=0, second=0, microsecond=0)
        endTime = localDate.replace(hour=16, minute=0, second=0, microsecond=0)

        
        //MAKE 4 BITACORAS DE TEMPERATURA
        const horas = [7,11,15,18] //Horas para cada bitacora
        const tempInitTime = localDate
        const tempEndTime = localDate
        const horaString = ""
        for(const i in horas){
            tempInitTime = localDate.replace(hour=horas[i], minute=0, second=0, microsecond=0)
            tempEndTime = localDate.replace(hour=horas[i]+1, minute=0, second=0, microsecond=0)
            horaString = "" + horas[i]
            
            const bitacoraTemperatura = await prisma.bitacoraTemperaturas.create({
                data: {
                    idUsuarioEmisor: 0,
                    recordatorioBitacoraTemperatura: {
                        create: {
                            nombre: "Llenar bitacora de temperatura",
                            descripcion: "Se debe de llenar esta bitacora",
                            horaInicial: tempInitTime,
                            horaFinal: tempEndTime
                        },
                    },
                    nombre: "Bitacora de temperatura " + horaString + " horas " + dateString,
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
                recordatorioBitacoraLimpiezaAlimentoCompartido: {
                    create:{
                        nombre: "Llenar bitacora de limpieza alimento compartido",
                        descripcion: "Se debe de llenar esta bitacora",
                        horaInicial: initTime,
                        horaFinal: endTime
                    },
                },
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
                recordatorioBitacoraLimpiezaAlimentoCompartido: {
                    create: {
                        nombre: "Llenar bitacora de limpieza recibos",
                        descripcion: "Se debe de llenar esta bitacora",
                        horaInicial: initTime,
                        horaFinal: endTime
                    },
                },
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
                recordatorioBitacoraLimpiezaEmpaques: {
                    create: {
                        nombre: "Llenar bitacora de limpieza empaques",
                        descripcion: "Se debe de llenar esta bitacora",
                        horaInicial: initTime,
                        horaFinal: endTime
                    },
                },
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
                recordatorioBitacoraLimpiezaCribasFV: {
                    create: {
                        nombre: "Llenar bitacora de limpieza cribas frutas y verduras",
                        descripcion: "Se debe de llenar esta bitacora",
                        horaInicial: initTime,
                        horaFinal: endTime
                    },
                },
                nombre: "Bitacora limpieza cribas frutas y verduras " + dateString,
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
                recordatorioBitacoraLimpiezaAlmacenes: {
                    create: {
                        nombre: "Llenar bitacora de limpieza almacenes",
                        descripcion: "Se debe de llenar esta bitacora",
                        horaInicial: initTime,
                        horaFinal: endTime
                    },
                },
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
                recordatorioBitacoraLimpiezaEntregas: {
                    create: {
                        nombre: "Llenar bitacora de limpieza entregas",
                        descripcion: "Se debe de llenar esta bitacora",
                        horaInicial: initTime,
                        horaFinal: endTime
                    },
                },
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