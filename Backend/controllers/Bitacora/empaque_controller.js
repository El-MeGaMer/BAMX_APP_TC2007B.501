import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

// Controllers for Incidentes Bitacoras, for more 
// information see file "/Backend/prisma/schema.prima"

//main controllers ----------------------

export const updateEmpaque = async (req, res) => {
    try {
        const {idUser, id}= req.params

        const seeIdUser = await prisma.usuarios.findUnique({
            where: {id: parseInt(idUser)},
            select: {
                idRol: true
            }
        })

        let nameRole = ""
        if(seeIdUser && seeIdUser.idRol) {
            const role = await prisma.roles.findUnique({
                where: { id: parseInt(seeIdUser.idRol) },
                select: { nombreRol: true }
            })
            nameRole = role ? role.nombreRol : ""
        }

        let result
        if (nameRole === "coordinador") {
            result = await prisma.bitacoraLimpiezaEmpaques.update({
                where: {id: parseInt(id)},
                data: {
                    estado: "revisado"
                } 
            })

        } else {
            const {
                pisos,
                mesas,
                selladores,
                basculas,
                rampas,
                estantes,
                bandejas,
                patines,
                observaciones
            } = req.body

            const newData = { ...req.body, estado: "enRevision" }

            result = await prisma.bitacoraLimpiezaEmpaques.update({
                where: {id: parseInt(id)},
                data: newData
            })
        }  

        res.json(result)

    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Entry not found')
        }
    }
}

// Complementary controllers ------------------------