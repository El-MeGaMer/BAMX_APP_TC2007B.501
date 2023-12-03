import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;

const seedRecordatorio = [];
const seedRoles = [];
const seedAreas = [];
const seedNotificaciones = [];
const seedUsuarios = [];
const seedAreasUsuarios = [];
const seedNotificacionesUsuarios = [];
const seedBitacorasExtintores = [];
const seedBitacoraIncidentes = [];
const seedBitacoraTemperatura = [];
const seedBitacoraLimpiezaAlimentoCompartidos = [];
const seedBitacoraLimpiezaRecibos = [];
const seedBitacoraLimpiezaEmpaques = [];
const seedBitacoraLimpiezaCribasFV = [];
const seedBitacoraLimpiezaAlmacenes = [];
const seedBitacoraLimpiezaEntregas = [];

let estados = ['revisado', 'noRevisado', 'enRevision']
let areas = ['recibo', 'cribaFV', 'empaque', 'almacen_comp', 'almacen', 'entrega', 'cuartos_frios']
let rol = ['administrador', 'coordinador', 'supervisor']

// Recordatorio
for (let i = 0; i < 7; i++) {
    seedRecordatorio.push({
        nombre: faker.company.buzzNoun(),
        descripcion: faker.company.catchPhrase(),
        horaInicial: faker.date.past(),
        horaFinal: faker.date.future()
    })
}

// Roles
for (let i = 0; i < 3; i++) {
    seedRoles.push({
        nombreRol: faker.helpers.arrayElement([rol[i]]),
    })
}

// Areas
for (let i = 0; i < 7; i++) {
    seedAreas.push({
        nombreArea: faker.helpers.arrayElement([areas[i]]),
    })
}

// Notificaciones
for (let i = 0; i < 7; i++) {
    seedNotificaciones.push({
        titulo: faker.company.buzzVerb(),
        descripcion: faker.company.buzzPhrase(),
        fechaHora: faker.date.recent(),
    })
}

// Usuarios
for (let i = 0; i < 7; i++) {
    const numberRandom = Math.floor(100000 + Math.random() * 900000).toString();
    seedUsuarios.push({
        idRecordatorio: i + 1,
        idRol: faker.number.int({ min: 1, max: 3 }),
        nombre: faker.person.firstName(),
        apellido: faker.person.lastName(),
        correo: faker.internet.email(),
        otp: numberRandom,
        expiracion: faker.date.recent(),
    })
}

// Areas Usuarios
for (let i = 0; i < 7; i++) {
    seedAreasUsuarios.push({
        idUsuario: i + 1,
        idArea: i + 1
    })
}

// Notificaciones Usuarios
for (let i = 0; i < 7; i++) {
    seedNotificacionesUsuarios.push({
        idNotificacion: i + 1,
        idUsuario: i + 1,
        estado: faker.helpers.arrayElement([estados[0], estados[1]])
    })
}

// Bitacoras Extintores
for (let i = 0; i < 7; i++) {
    seedBitacorasExtintores.push({
        idUsuarioEmisor: i + 1,
        idArea: i + 1,                      // cualquier area 
        idRecordatorio: i + 1,
        nombre: 'Bitácora de Extintores',
        capacidad: faker.helpers.arrayElement([true, false]),
        manometro: faker.helpers.arrayElement([true, false]),
        estadoFisico: faker.helpers.arrayElement([true, false]),
        mangueras: faker.helpers.arrayElement([true, false]),
        seguro: faker.helpers.arrayElement([true, false]),
        etiquetas: faker.helpers.arrayElement([true, false]),
        holograma: faker.helpers.arrayElement([true, false]),
        ultimaRevision: faker.date.past(),
        proximaRecarga: faker.date.soon(),
        observaciones: faker.helpers.arrayElement(['no hay observaciones', 'bien', 'mal', null]),
        estado: estados[i % 3]
    })
}

// Bitacora Incidentes
for (let i = 0; i < 7; i++) {
    seedBitacoraIncidentes.push({
        idUsuarioEmisor: i + 1,
        idUsuarioSupervisor: i + 1,
        idArea: i + 1,                      // cualquier area
        nombre: 'Bitácora de Incidentes',
        fechaHora: faker.date.recent(),
        descripcion: faker.helpers.arrayElement(['no hay observaciones', 'bien', 'mal']),
        imagen: faker.helpers.arrayElement([null]),
        estado: estados[i % 3]
    })
}


// Bitacora Temperatura
for (let i = 0; i < 7; i++) {
    seedBitacoraTemperatura.push({
        idUsuarioEmisor: i + 1,
        idRecordatorio: i + 1,
        idArea: 7,                      // cuertos_frios
        nombre: 'Bitácora de Temperatura',
        fechaHora: faker.date.recent(),
        cuartoFrio1: faker.number.int({ min: -15, max: 50 }),
        cuartoFrio2: faker.number.int({ min: -15, max: 50 }),
        camaraConservacionB: faker.number.int({ min: -15, max: 50 }),
        camaraConservacionC: faker.number.int({ min: -15, max: 50 }),
        observaciones: faker.helpers.arrayElement(['no hay observaciones', 'bien', 'mal', null]),
        estado: estados[i % 3]
    })
}

// Bitacora Limpieza Alimento Compartidos
for (let i = 0; i < 7; i++) {
    seedBitacoraLimpiezaAlimentoCompartidos.push({
        idUsuarioEmisor: i + 1,
        idUsuarioSupervisor: i + 1,
        idArea: 4,                          // almacen_comp
        idRecordatorio: i + 1,
        nombre: 'Bitácora de Alimentos Compartidos',
        dia: faker.number.int({ min: 1, max: 31 }),
        fechaHora: faker.date.recent(),
        pisos: faker.helpers.arrayElement([true, false]),
        cuartosFrios: faker.helpers.arrayElement([true, false]),
        refrigeradores: faker.helpers.arrayElement([true, false]),
        congeladores: faker.helpers.arrayElement([true, false]),
        racks: faker.helpers.arrayElement([true, false]),
        cortinas: faker.helpers.arrayElement([true, false]),
        patines: faker.helpers.arrayElement([true, false]),
        basculas: faker.helpers.arrayElement([true, false]),
        observaciones: faker.helpers.arrayElement(['no hay observaciones', 'bien', 'mal', null]),
        estado: estados[i % 3]
    })
}

// Bitacora Limpieza Recibos
for (let i = 0; i < 7; i++) {
    seedBitacoraLimpiezaRecibos.push({
        idUsuarioEmisor: i + 1,
        idUsuarioSupervisor: i + 1,
        idArea: 1,                          // recibo
        idRecordatorio: i + 1,
        nombre: 'Bitácora de Limpieza Recibos',
        dia: faker.number.int({ min: 1, max: 31 }),
        fechaHora: faker.date.recent(),
        areaArmado: faker.helpers.arrayElement([true, false]),
        areaRecibo: faker.helpers.arrayElement([true, false]),
        patio: faker.helpers.arrayElement([true, false]),
        rampas: faker.helpers.arrayElement([true, false]),
        cuartosFrios: faker.helpers.arrayElement([true, false]),
        congelador: faker.helpers.arrayElement([true, false]),
        transporte: faker.helpers.arrayElement([true, false]),
        observaciones: faker.helpers.arrayElement(['no hay observaciones', 'bien', 'mal', null]),
        estado: estados[i % 3]
    })
}

// Bitacora Limpieza Empaques
for (let i = 0; i < 7; i++) {
    seedBitacoraLimpiezaEmpaques.push({
        idUsuarioEmisor: i + 1,
        idUsuarioSupervisor: i + 1,
        idArea: 3,                      // empaque
        idRecordatorio: i + 1,
        nombre: 'Bitácora de Limpieza Empaques',
        dia: faker.number.int({ min: 1, max: 31 }),
        fechaHora: faker.date.recent(),
        pisos: faker.helpers.arrayElement([true, false]),
        mesas: faker.helpers.arrayElement([true, false]),
        selladores: faker.helpers.arrayElement([true, false]),
        basculas: faker.helpers.arrayElement([true, false]),
        rampas: faker.helpers.arrayElement([true, false]),
        estantes: faker.helpers.arrayElement([true, false]),
        bandejas: faker.helpers.arrayElement([true, false]),
        patines: faker.helpers.arrayElement([true, false]),
        observaciones: faker.helpers.arrayElement(['no hay observaciones', 'bien', 'mal', null]),
        estado: estados[i % 3]
    })
}

// Bitacora Limpieza CribasFV
for (let i = 0; i < 7; i++) {
    seedBitacoraLimpiezaCribasFV.push({
        idUsuarioEmisor: i + 1,
        idUsuarioSupervisor: i + 1,
        idArea: 2,                      // cribas
        idRecordatorio: i + 1,
        nombre: 'Bitácora de Limpieza CribasFV',
        dia: faker.number.int({ min: 1, max: 31 }),
        fechaHora: faker.date.recent(),
        pisos: faker.helpers.arrayElement([true, false]),
        mesas: faker.helpers.arrayElement([true, false]),
        patio: faker.helpers.arrayElement([true, false]),
        basculas: faker.helpers.arrayElement([true, false]),
        rampas: faker.helpers.arrayElement([true, false]),
        rejillas: faker.helpers.arrayElement([true, false]),
        patines: faker.helpers.arrayElement([true, false]),
        observaciones: faker.helpers.arrayElement(['no hay observaciones', 'bien', 'mal', null]),
        estado: estados[i % 3]
    })
}

// Bitacora Limpieza Almacenes
for (let i = 0; i < 7; i++) {
    seedBitacoraLimpiezaAlmacenes.push({
        idUsuarioEmisor: i + 1,
        idUsuarioSupervisor: i + 1,
        idArea: 5,                      // almacen
        idRecordatorio: i + 1,
        nombre: 'Bitácora de Limpieza Almacenes',
        dia: faker.number.int({ min: 1, max: 31 }),
        fechaHora: faker.date.recent(),
        pisos: faker.helpers.arrayElement([true, false]),
        pasillos: faker.helpers.arrayElement([true, false]),
        extintores: faker.helpers.arrayElement([true, false]),
        cuartosFrios: faker.helpers.arrayElement([true, false]),
        puertas: faker.helpers.arrayElement([true, false]),
        muros: faker.helpers.arrayElement([true, false]),
        racks: faker.helpers.arrayElement([true, false]),
        cortinas: faker.helpers.arrayElement([true, false]),
        coladeras: faker.helpers.arrayElement([true, false]),
        rejillas: faker.helpers.arrayElement([true, false]),
        montacargas: faker.helpers.arrayElement([true, false]),
        patines: faker.helpers.arrayElement([true, false]),
        observaciones: faker.helpers.arrayElement(['no hay observaciones', 'bien', 'mal', null]),
        estado: estados[i % 3]
    })
}

// Bitacora Limpieza Entregas
for (let i = 0; i < 7; i++) {
    seedBitacoraLimpiezaEntregas.push({
        idUsuarioEmisor: i + 1,
        idUsuarioSupervisor: i + 1,
        idArea: 6,                  // entrega
        idRecordatorio: i + 1,
        nombre: 'Bitácora de Limpieza Entregas',
        dia: faker.number.int({ min: 1, max: 31 }),
        fechaHora: faker.date.recent(),
        pisos: faker.helpers.arrayElement([true, false]),
        cuartosFrios: faker.helpers.arrayElement([true, false]),
        basculas: faker.helpers.arrayElement([true, false]),
        racks: faker.helpers.arrayElement([true, false]),
        cortinas: faker.helpers.arrayElement([true, false]),
        rampas: faker.helpers.arrayElement([true, false]),
        patines: faker.helpers.arrayElement([true, false]),
        observaciones: faker.helpers.arrayElement(['no hay observaciones', 'bien', 'mal', null]),
        estado: estados[i % 3]
    })
}

export {
    seedRecordatorio,
    seedRoles,
    seedNotificaciones,
    seedAreas,
    seedUsuarios,
    seedAreasUsuarios,
    seedNotificacionesUsuarios,
    seedBitacorasExtintores,
    seedBitacoraIncidentes,
    seedBitacoraTemperatura,
    seedBitacoraLimpiezaAlimentoCompartidos,
    seedBitacoraLimpiezaEmpaques,
    seedBitacoraLimpiezaRecibos,
    seedBitacoraLimpiezaCribasFV,
    seedBitacoraLimpiezaAlmacenes,
    seedBitacoraLimpiezaEntregas
}
