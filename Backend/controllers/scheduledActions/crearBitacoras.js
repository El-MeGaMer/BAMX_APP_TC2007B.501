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
        // Use local time
        const utctime = new Date().toISOString();
        const localDate = new Date(utctime);
        // Get the day of the week (0-6, where 0 is Sunday and 6 is Saturday)
        const year = localDate.getFullYear();
        const month = localDate.getMonth() + 1;
        const dayOfWeek = localDate.getDate();
        const dateString = dayOfWeek + "/" + month + "/" + year

        // Set beginning and end times for the bitacoras
        const initTime = new Date(utctime)
        const endTime = new Date(utctime)
        initTime.setHours(4,0,0,0)
        endTime.setHours(16,0,0,0)
        
        //MAKE 4 BITACORAS DE TEMPERATURA
        const horas = [7,11,15,18] //Horas para cada bitacora
        let tempInitTime = new Date(utctime)
        let tempEndTime = new Date(utctime)
        for(let i in horas){
            tempInitTime.setHours(horas[i],0,0,0)
            tempEndTime.setHours(horas[i] + 1,0,0,0)
            console.log("Bitacora de temperatura " + horas[i] + " horas " + dateString)
            const bitacoraTemperatura = await prisma.bitacoraTemperaturas.create({
                data: {
                    usuarioEmisor: {
                        connect: {id: 1}
                    },
                    recordatorioBitacoraTemperatura: {
                        create: {
                            nombre: "Llenar bitacora de temperatura",
                            descripcion: "Se debe de llenar esta bitacora",
                            horaInicial: tempInitTime,
                            horaFinal: tempEndTime
                        },
                    },
                    nombre: "Bitacora de temperatura " + horas[i] + " horas " + dateString,
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
                usuarioEmisor: {
                    connect: {id: 1}
                },
                idUsuarioSupervisor: {
                    connect: {id: 2}
                },
                areaBitacoraLimpiezaAlimentoCompartido: {
                    connect: {id: 1}
                },
                recordatorioBitacoraLimpiezaAlimentoCompartido: {
                    create:{
                        nombre: "Llenar bitacora de limpieza alimento compartido",
                        descripcion: "Se debe de llenar esta bitacora",
                        horaInicial: initTime,
                        horaFinal: endTime
                    },
                },
                dia: dayOfWeek,
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
                usuarioEmisor: {
                    connect: {id: 1}
                },
                idUsuarioSupervisor: {
                    connect: {id: 2}
                },
                areaBitacoraLimpiezaRecibos: {
                    connect: {id: 1}
                },
                recordatorioBitacoraLimpiezaAlimentoCompartido: {
                    create: {
                        nombre: "Llenar bitacora de limpieza recibos",
                        descripcion: "Se debe de llenar esta bitacora",
                        horaInicial: initTime,
                        horaFinal: endTime
                    },
                },
                nombre: "Bitacora de limpieza recibos " + dateString,
                dia: dayOfWeek,
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
                usuarioEmisor: {
                    connect: {id: 1}
                },
                idUsuarioSupervisor: {
                    connect: {id: 2}
                },
                areaBitacoraLimpiezaEmpaques: {
                    connect: {id: 1}
                },
                recordatorioBitacoraLimpiezaEmpaques: {
                    create: {
                        nombre: "Llenar bitacora de limpieza empaques",
                        descripcion: "Se debe de llenar esta bitacora",
                        horaInicial: initTime,
                        horaFinal: endTime
                    },
                },
                nombre: "Bitacora limpieza empaques " + dateString,
                dia: dayOfWeek,
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
                usuarioEmisor: {
                    connect: {id: 1}
                },
                idUsuarioSupervisor: {
                    connect: {id: 2}
                },
                areaBitacoraLimpiezaCribasFVs: {
                    connect: {id: 1}
                },
                recordatorioBitacoraLimpiezaCribasFV: {
                    create: {
                        nombre: "Llenar bitacora de limpieza cribas frutas y verduras",
                        descripcion: "Se debe de llenar esta bitacora",
                        horaInicial: initTime,
                        horaFinal: endTime
                    },
                },
                nombre: "Bitacora limpieza cribas frutas y verduras " + dateString,
                dia: dayOfWeek,
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
                usuarioEmisor: {
                    connect: {id: 1}
                },
                idUsuarioSupervisor: {
                    connect: {id: 2}
                },
                areaBitacoraLimpiezaAlmacenes: {
                    connect: {id: 1}
                },
                recordatorioBitacoraLimpiezaAlmacenes: {
                    create: {
                        nombre: "Llenar bitacora de limpieza almacenes",
                        descripcion: "Se debe de llenar esta bitacora",
                        horaInicial: initTime,
                        horaFinal: endTime
                    },
                },
                nombre: "Bitacora limpieza almacenes " + dateString,
                dia: dayOfWeek,
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
                usuarioEmisor: {
                    connect: {id: 1}
                },
                idUsuarioSupervisor: {
                    connect: {id: 2}
                },
                areaBitacoraLimpiezaEntregas: {
                    connect: {id: 1}
                },
                recordatorioBitacoraLimpiezaEntregas: {
                    create: {
                        nombre: "Llenar bitacora de limpieza entregas",
                        descripcion: "Se debe de llenar esta bitacora",
                        horaInicial: initTime,
                        horaFinal: endTime
                    },
                },
                nombre: "Bitacora de limpieza entregas " + dateString,
                dia: dayOfWeek,
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