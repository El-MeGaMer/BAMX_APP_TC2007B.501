import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;

const seedRecordatorio = [];
const seedRoles = [];
const seedAreas = [];
const seedNotificaciones = [];
const seedUsuarios = [];
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

const Estado = ['revisado', 'noRevisado', 'enRevision', 'creado'];


// Recordatorio
for (let i = 0; i < 5; i++) {
    seedRecordatorio.push({
        nombre: faker.company.buzzNoun(),
        descripcion: faker.company.catchPhrase(),
        horaInicial: faker.date.past(),
        horaFinal: faker.date.future()
    })
}

// Roles
for (let i = 0; i < 5; i++) {
    seedRoles.push({
        nombreRol: faker.helpers.arrayElement(['administrador', 'supervisor de área', 'operador', 'usuario']),
    })
}

// Areas
for (let i = 0; i < 5; i++) {
    seedAreas.push({
        nombreArea: faker.helpers.arrayElement(['alimento', 'limpieza', 'empaque', 'criba', 'almacen', 'entregas']),
    })
}

// Notificaciones
for (let i = 0; i < 5; i++) {
    seedNotificaciones.push({
        titulo: faker.company.buzzVerb(),
        descripcion: faker.company.buzzPhrase()
    })
}

// Usuarios
for (let i = 0; i < 5; i++) {
    seedUsuarios.push({
        idRecordatorio: i + 1,
        idRol: i + 1,
        idArea: i + 1,
        nombre: faker.person.firstName(),
        apellido: faker.person.lastName(),
        correo: faker.internet.email(),
    })
}

// Notificaciones Usuarios
for (let i = 0; i < 5; i++) {
    seedNotificacionesUsuarios.push({
        idNotificacion: i + 1,
        idUsuario: i + 1,
    })
}

// Bitacoras Extintores
for (let i = 0; i < 5; i++) {
    seedBitacorasExtintores.push({
        idUsuarioEmisor: i + 1,
        idArea: i + 1,
        idRecordatorio: i + 1,
        nombre: 'Bitácora de Extintonres',
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
        estado: faker.helpers.arrayElement(Estado)
    })
}

// Bitacora Incidentes
for (let i = 0; i < 5; i++) {
    seedBitacoraIncidentes.push({
        idUsuarioEmisor: i + 1,
        idUsuarioSupervisor: i + 1,
        idArea: i + 1,
        nombre: 'Bitácora de Incidentes',
        fechaHora: faker.date.recent(),
        descripcion: faker.helpers.arrayElement(['no hay observaciones', 'bien', 'mal']),
        imagen: faker.helpers.arrayElement([null]),
        estado: faker.helpers.arrayElement(Estado)
    })
}

// Bitacora Temperatura
for (let i = 0; i < 5; i++) {
    seedBitacoraTemperatura.push({
        idUsuarioEmisor: i + 1,
        idRecordatorio: i + 1,
        nombre: 'Bitácora de Temperatura',
        fechaHora: faker.date.recent(),
        cuartoFrio1: faker.number.int({min: -15, max: 50}),
        cuartoFrio2:faker.number.int({min: -15, max: 50}),
        camaraConservacionB: faker.number.int({min: -15, max: 50}),
        camaraConservacionC: faker.number.int({min: -15, max: 50}),
        observaciones: faker.helpers.arrayElement(['no hay observaciones', 'bien', 'mal', null]),
        estado: faker.helpers.arrayElement(Estado)
    })
}

// Bitacora Limpieza Alimento Compartidos
for (let i = 0; i < 5; i++) {
    seedBitacoraLimpiezaAlimentoCompartidos.push({
        idUsuarioEmisor: i + 1,
        idUsuarioSupervisor: i + 1,
        idArea: i + 1,
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
        estado: faker.helpers.arrayElement(Estado)
    })
}

// Bitacora Limpieza Recibos
for (let i = 0; i < 5; i++) {
    seedBitacoraLimpiezaRecibos.push({
        idUsuarioEmisor: i + 1,
        idUsuarioSupervisor: i + 1,
        idArea: i + 1,
        idRecordatorio: i + 1,
        nombre: 'Bitácora de Limpieza Recibos',
        dia: faker.number.int({min: 1, max: 31}),
        fechaHora: faker.date.recent(),
        areaArmado: faker.helpers.arrayElement([true, false]),
        areaRecibo: faker.helpers.arrayElement([true, false]),
        patio: faker.helpers.arrayElement([true, false]),
        rampas: faker.helpers.arrayElement([true, false]),
        cuartosFrios: faker.helpers.arrayElement([true, false]),
        congelador: faker.helpers.arrayElement([true, false]),
        transporte: faker.helpers.arrayElement([true, false]),
        observaciones: faker.helpers.arrayElement(['no hay observaciones', 'bien', 'mal', null]),
        estado: faker.helpers.arrayElement(Estado)
    })
}

// Bitacora Limpieza Empaques
for (let i = 0; i < 5; i++) {
    seedBitacoraLimpiezaEmpaques.push({
        idUsuarioEmisor: i + 1,
        idUsuarioSupervisor: i + 1,
        idArea: i + 1,
        idRecordatorio: i + 1,
        nombre: 'Bitácora de Limpieza Empaques',
        dia: faker.number.int({min: 1, max: 31}),
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
        estado: faker.helpers.arrayElement(['revisado', 'noRevisado', 'enRevision', 'creado'])
    })
}

// Bitacora Limpieza CribasFV
for (let i = 0; i < 5; i++) {
    seedBitacoraLimpiezaCribasFV.push({
        idUsuarioEmisor: i + 1,
        idUsuarioSupervisor: i + 1,
        idArea: i + 1,
        idRecordatorio: i + 1,
        nombre: 'Bitácora de Limpieza CribasFV',
        dia: faker.number.int({min: 1, max:31}),
        fechaHora: faker.date.recent(),
        pisos: faker.helpers.arrayElement([true, false]),
        mesas: faker.helpers.arrayElement([true, false]),
        patio: faker.helpers.arrayElement([true, false]),
        basculas: faker.helpers.arrayElement([true, false]),
        rampas: faker.helpers.arrayElement([true, false]),
        rejillas: faker.helpers.arrayElement([true, false]),
        patines: faker.helpers.arrayElement([true, false]),
        observaciones: faker.helpers.arrayElement(['no hay observaciones', 'bien', 'mal', null]),
        estado: faker.helpers.arrayElement(['revisado', 'noRevisado', 'enRevision', 'creado'])
    })
} 

// Bitacora Limpieza Almacenes
for (let i = 0; i < 5; i++) {
    seedBitacoraLimpiezaAlmacenes.push({
        idUsuarioEmisor: i + 1,
        idUsuarioSupervisor: i + 1,
        idArea: i + 1,
        idRecordatorio: i + 1,
        nombre: 'Bitácora de Limpieza Almacenes',
        dia: faker.number.int({min: 1, max: 31}),
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
        estado: faker.helpers.arrayElement(['revisado', 'noRevisado', 'enRevision', 'creado'])
      
    })
}

// Bitacora Limpieza Entregas
for (let i = 0; i < 5; i++) {
    seedBitacoraLimpiezaEntregas.push({
        idUsuarioEmisor: i + 1,
        idUsuarioSupervisor: i + 1,
        idArea: i + 1,
        idRecordatorio: i + 1,
        nombre: 'Bitácora de Limpieza Entregas',
        dia: faker.number.int({min: 1, max: 31}),
        fechaHora: faker.date.recent(),
        pisos: faker.helpers.arrayElement([true, false]),
        cuartosFrios: faker.helpers.arrayElement([true, false]),
        basculas: faker.helpers.arrayElement([true, false]),
        racks: faker.helpers.arrayElement([true, false]),
        cortinas: faker.helpers.arrayElement([true, false]),
        rampas: faker.helpers.arrayElement([true, false]),
        patines: faker.helpers.arrayElement([true, false]),
        observaciones: faker.helpers.arrayElement(['no hay observaciones', 'bien', 'mal', null]),
        estado: faker.helpers.arrayElement(['revisado', 'noRevisado', 'enRevision', 'creado'])
    })
}

export {
    seedRecordatorio,
    seedRoles,
    seedNotificaciones,
    seedAreas,
    seedUsuarios,
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