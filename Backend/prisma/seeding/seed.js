import { PrismaClient } from "@prisma/client";
import {
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
  seedBitacoraLimpiezaCribasFV,
  seedBitacoraLimpiezaAlmacenes,
  seedBitacoraLimpiezaEntregas,
  seedBitacoraLimpiezaRecibos,
  seedBitacoraLimpiezaEmpaques,
} from "./data.js";

const prisma = new PrismaClient();

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

async function seedAreasUsuariosDB() {
  try {
    const seed = await prisma.areasUsuario.createMany({
      data: seedAreasUsuarios
    })
    console.log("Areas usuarios Seed Successful: ", { seed });
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

async function deleteAllData() {
  try {
    await prisma.$executeRaw`SET foreign_key_checks = 0`;
    await prisma.bitacoraLimpiezaEntregas.deleteMany();
    await prisma.bitacoraLimpiezaAlmacenes.deleteMany();
    await prisma.bitacoraLimpiezaCribasFV.deleteMany();
    await prisma.bitacoraLimpiezaEmpaques.deleteMany();
    await prisma.bitacoraLimpiezaRecibos.deleteMany();
    await prisma.bitacoraLimpiezaAlimentoCompartidos.deleteMany();
    await prisma.bitacoraTemperaturas.deleteMany();
    await prisma.bitacoraIncidentes.deleteMany();
    await prisma.bitacoraExtintores.deleteMany();
    await prisma.notificacionesUsuarios.deleteMany();
    await prisma.areasUsuario.deleteMany();
    await prisma.usuarios.deleteMany();

    await prisma.notificaciones.deleteMany();
    await prisma.areas.deleteMany();
    await prisma.roles.deleteMany();
    await prisma.recordatorios.deleteMany();
    await prisma.$executeRaw`SET foreign_key_checks = 1`;

    await prisma.$executeRaw`ALTER TABLE recordatorios AUTO_INCREMENT = 1`;
    await prisma.$executeRaw`ALTER TABLE roles AUTO_INCREMENT = 1`;
    await prisma.$executeRaw`ALTER TABLE notificaciones AUTO_INCREMENT = 1`;
    await prisma.$executeRaw`ALTER TABLE usuarios AUTO_INCREMENT = 1`;
    await prisma.$executeRaw`ALTER TABLE areas AUTO_INCREMENT = 1`;

    await prisma.$executeRaw`ALTER TABLE bitacoraLimpiezaEntregas AUTO_INCREMENT = 1`;
    await prisma.$executeRaw`ALTER TABLE bitacoraLimpiezaAlmacenes AUTO_INCREMENT = 1`;
    await prisma.$executeRaw`ALTER TABLE bitacoraLimpiezaCribasFV AUTO_INCREMENT = 1`;
    await prisma.$executeRaw`ALTER TABLE bitacoraLimpiezaEmpaques AUTO_INCREMENT = 1`;
    await prisma.$executeRaw`ALTER TABLE bitacoraLimpiezaRecibos AUTO_INCREMENT = 1`;
    await prisma.$executeRaw`ALTER TABLE bitacoraLimpiezaAlimentoCompartidos AUTO_INCREMENT = 1`;
    await prisma.$executeRaw`ALTER TABLE bitacoraTemperaturas AUTO_INCREMENT = 1`;
    await prisma.$executeRaw`ALTER TABLE bitacoraIncidentes AUTO_INCREMENT = 1`;
    await prisma.$executeRaw`ALTER TABLE bitacoraExtintores AUTO_INCREMENT = 1`;

    console.log("All data deleted successfully");
  } catch (error) {
    console.log("Error deleting data: ", error);
  }
}

async function main() {
  if (process.env.NODE_ENV === 'local' &&
    prisma.usuarios.findFirst() !== null) {
    console.log("Local environment. Executed seeding")
    await deleteAllData()
  } else if (process.env.NODE_ENV === undefined) {
    console.log("Not in local environment. You are not able to doing a reseeding.")
    console.log("Check if you have the environment specified in the .env file.")
    console.log('Like this: NODE_ENV="local"')
    return
  }
  // Siembra las tablas no dependiente primero
  await seedRecordatorioDB();
  await seedRolesDB();
  await seedAreasDB();
  await seedNotificacionesDB();
  // Siembra las tablas dependientes 
  await seedUsuariosDB();
  await seedAreasUsuariosDB();
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