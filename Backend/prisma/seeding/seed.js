import { PrismaClient } from "@prisma/client";
import {
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
  seedBitacoraLimpiezaCribasFV,
  seedBitacoraLimpiezaAlmacenes,
  seedBitacoraLimpiezaEntregas,
  seedBitacoraLimpiezaRecibos,
  seedBitacoraLimpiezaEmpaques,
} from "./data.js";

const prisma = new PrismaClient();

// async function deleteAllData() {
//   // Eliminar datos de tablas dependientes
//   await prisma.usuarios.deleteMany({});
//   await prisma.notificacionesUsuarios.deleteMany({});
//   await prisma.bitacoraExtintores.deleteMany({});
//   await prisma.bitacoraIncidentes.deleteMany({});
//   await prisma.bitacoraTemperaturas.deleteMany({});
//   await prisma.bitacoraLimpiezaAlimentoCompartidos.deleteMany({});
//   await prisma.bitacoraLimpiezaRecibos.deleteMany({});
//   await prisma.bitacoraLimpiezaCribasFV.deleteMany({});
//   await prisma.bitacoraLimpiezaAlmacenes.deleteMany({});
//   await prisma.bitacoraLimpiezaEmpaques.deleteMany({});
//   await prisma.bitacoraLimpiezaEntregas.deleteMany({});

//   // Eliminar datos de la tabla recordatorios
//   await prisma.recordatorios.deleteMany({});
//   await prisma.roles.deleteMany({});
//   await prisma.areas.deleteMany({});
//   await prisma.notificaciones.deleteMany({});
// }

async function seedRecordatorioDB() {
  try {
    const seed = await prisma.recordatorios.createMany({
      data: seedRecordatorio
    })
    console.log("Recordatorio Seed Successful : ", { seed });
  } catch (error) {
    console.log("Error sending data: ", error);
  }
}

async function seedRolesDB() {
  try {
    const seed = await prisma.roles.createMany({
      data: seedRoles
    })
    console.log("Roles Seed Successful: ", { seed });
  } catch (error) {
    console.log("Error sending data: ", error);
  }
}

async function seedAreasDB() {
  try {
    const seed = await prisma.areas.createMany({
      data: seedAreas
    })
    console.log("Areas Seed Successful: ", { seed });
  } catch (error) {
    console.log("Error sending data: ", error);
  }
}

async function seedNotificacionesDB() {
  try {
    const seed = await prisma.notificaciones.createMany({
      data: seedNotificaciones
    })
    console.log("Notificaciones Seed Successful: ", { seed });
  } catch (error) {
    console.log("Error sending data: ", error);
  }
}


async function seedUsuariosDB() {
  try {
    const seed = await prisma.usuarios.createMany({
      data: seedUsuarios
    })
    console.log("Usuarios Seed Successful: ", { seed });
  } catch (error) {
    console.log("Error sending data: ", error);
  }
}

async function seedNotificacionesUsuariosDB() {
  try {
    const seed = await prisma.notificacionesUsuarios.createMany({
      data: seedNotificacionesUsuarios
    })
    console.log("Notificaciones usuarios Seed Successful: ", { seed });
  } catch (error) {
    console.log("Error sending data: ", error);
  }
}

async function seedBitacorasExtintoresDB() {
  try {
    const seed = await prisma.bitacoraExtintores.createMany({
      data: seedBitacorasExtintores
    })
    console.log("Bitacoras extintores Seed Successful: ", { seed });
  } catch (error) {
    console.log("Error sending data: ", error);
  }
}

async function seedBitacoraIncidentesDB() {
  try {
    const seed = await prisma.bitacoraIncidentes.createMany({
      data: seedBitacoraIncidentes
    })
    console.log("Bitacoras incidentes Seed Successful: ", { seed });
  } catch (error) {
    console.log("Error sending data: ", error);
  }
}

async function seedBitacoraTemperaturaDB() {
  try {
    const seed = await prisma.bitacoraTemperaturas.createMany({
      data: seedBitacoraTemperatura
    })
    console.log("Bitacoras temperatura Seed Successful: ", { seed });
  } catch (error) {
    console.log("Error sending data: ", error);
  }
}

async function seedbitacoraLimpiezaAlimentoCompartidosDB() {
  try {
    const seed = await prisma.bitacoraLimpiezaAlimentoCompartidos.createMany({
      data: seedBitacoraLimpiezaAlimentoCompartidos
    })
    console.log("Bitacoras limpieza alimentos Seed Successful: ", { seed });
  } catch (error) {
    console.log("Error sending data: ", error);
  }
}

async function seedBitacoraLimpiezaRecibosDB() {
  try {
    const seed = await prisma.bitacoraLimpiezaRecibos.createMany({
      data: seedBitacoraLimpiezaRecibos
    })
    console.log("Bitacoras limpieza recibos Seed Successful: ", { seed });
  } catch (error) {
    console.log("Error sending data: ", error);
  }
}

async function seedBitacoraLimpiezaEmpaquesDB() {
  try {
    const seed = await prisma.bitacoraLimpiezaEmpaques.createMany({
      data: seedBitacoraLimpiezaEmpaques
    })
    console.log("Bitacoras limpieza empaques Seed Successful: ", { seed });
  } catch (error) {
    console.log("Error sending data: ", error);
  }
}

async function seedBitacoraLimpiezaCribasFVDB() {
  try {
    const seed = await prisma.bitacoraLimpiezaCribasFV.createMany({
      data: seedBitacoraLimpiezaCribasFV
    })
    console.log("Bitacoras limpieza cribasFV Seed Successful: ", { seed });
  } catch (error) {
    console.log("Error sending data: ", error);
  }
}

async function seedBitacoraLimpiezaAlmacenesDB() {
  try {
    const seed = await prisma.bitacoraLimpiezaAlmacenes.createMany({
    data: seedBitacoraLimpiezaAlmacenes
    })
    console.log("Bitacoras limpieza almacenes Seed Successful: ", { seed });
  } catch (error) {
    console.log("Error sending data: ", error);
  }
}

async function seedBitacoraLimpiezaEntregasDB() {
  try {
    const seed = await prisma.bitacoraLimpiezaEntregas.createMany({
    data: seedBitacoraLimpiezaEntregas
    })
    console.log("Bitacoras limpieza entregas Seed Successful: ", { seed });
  } catch (error) {
    console.log("Error sending data: ", error);
  }
}


async function main() {
  // const isLocal = process.env.NODE_ENV === 'local';

  // if (isLocal) {
  //   await deleteAllData();
  //   console.log(isLocal);
  // }

  // Siembra las tablas no dependiente primero
  await seedRecordatorioDB();
  await seedRolesDB();
  await seedAreasDB();
  await seedNotificacionesDB();
  
  // Siembra las tablas dependientes 
  await seedUsuariosDB();
  await seedNotificacionesUsuariosDB();
  await seedBitacorasExtintoresDB();
  await seedBitacoraIncidentesDB();
  await seedBitacoraTemperaturaDB();
  await seedbitacoraLimpiezaAlimentoCompartidosDB();
  await seedBitacoraLimpiezaRecibosDB();
  await seedBitacoraLimpiezaEmpaquesDB();
  await seedBitacoraLimpiezaCribasFVDB();
  await seedBitacoraLimpiezaAlmacenesDB();
  await seedBitacoraLimpiezaEntregasDB();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })