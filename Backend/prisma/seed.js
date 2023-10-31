import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

async function main() {
  const seedExample = await prisma.example.create({
    data: {
      title: "Prisma",
      content: "Seed",
      name: "Hola"
    }
  })
  console.log({seedExample})
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