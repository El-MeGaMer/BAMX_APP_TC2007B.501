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

        //CAMBIOS EN EL SCHEMA
        // VARCHAR 100 PARA BITACORAS (MENOS EXTINTORES) Y RECORDATORIOS
        // ? A LOS VALORES BOOLEAN DE LAS BITACORAS
        // DATETIME EN BIRACORA RECIBOS

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
                    areaBitacoraTemperatura: {
                        connect: {id: 1}
                    },
                    nombre: "Bitacora de temperatura " + horas[i] + " horas " + dateString,
                    cuartoFrio1: 0,
                    cuartoFrio2: 0,
                    camaraConservacionB: 0,
                    camaraConservacionC: 0,
                    observaciones: "",
                    estado: "noRevisado"
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
                usuarioSupervisor: {
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
                estado: "noRevisado"
            }
        })
        console.log("CB Limpieza Alimento Compartido")
        const bitacoraLimpiezaRecibos = await prisma.bitacoraLimpiezaRecibos.create({
            data: {
                usuarioEmisor: {
                    connect: {id: 1}
                },
                usuarioSupervisor: {
                    connect: {id: 2}
                },
                areaBitacoraLimpiezaRecibos: {
                    connect: {id: 1}
                },
                recordatorioBitacoraLimpiezaRecibos: {
                    create: {
                        nombre: "Llenar bitacora de limpieza recibos",
                        descripcion: "Se debe de llenar esta bitacora",
                        horaInicial: initTime,
                        horaFinal: endTime
                    },
                },
                nombre: "Bitacora de limpieza recibos " + dateString,
                dia: dayOfWeek,
                estado: "noRevisado"
            }
        })
        console.log("CB Limpieza Recibos")
        const bitacoraLimpiezaEmpaques = await prisma.bitacoraLimpiezaEmpaques.create({
            data: {
                usuarioEmisor: {
                    connect: {id: 1}
                },
                usuarioSupervisor: {
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
                estado: "noRevisado"
            }
        })
        console.log("CB Limpieza Empaques")
        const bitacoraLimpiezaCribasFV = await prisma.bitacoraLimpiezaCribasFV.create({
            data: {
                usuarioEmisor: {
                    connect: {id: 1}
                },
                usuarioSupervisor: {
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
                estado: "noRevisado"
            }
        })
        console.log("CB Limpieza Cribas FV")
        const bitacoraLimpiezaAlmacenes = await prisma.bitacoraLimpiezaAlmacenes.create({
            data: {
                usuarioEmisor: {
                    connect: {id: 1}
                },
                usuarioSupervisor: {
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
                estado: "noRevisado"
            }
        })
        console.log("CB Limpieza Almacenes")
        const bitacoraLimpiezaEntregas = await prisma.bitacoraLimpiezaEntregas.create({
            data: {
                usuarioEmisor: {
                    connect: {id: 1}
                },
                usuarioSupervisor: {
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
                estado: "noRevisado"
            }
        })
        console.log("CB Limpieza Entregas")
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Could not add the entry:', error)
        }
    }
}