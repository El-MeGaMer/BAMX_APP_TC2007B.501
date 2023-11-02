import { PrismaClient } from "@prisma/client";
import { seedData } from "./seeders/seedData.js";

const prisma = new PrismaClient

async function seedExampleDB() {
  for (const data of seedData) {
    try {
      const seedExample = await prisma.example.create ({
        data, 
      })
      console.log("Seed Successful: ", seedExample)
    } catch (error) {
      console.log ("Error sending data: ", error)
    }
  } 
}

async function main() {
  await seedExampleDB()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})