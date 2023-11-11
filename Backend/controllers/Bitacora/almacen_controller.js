import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

export const postExample = async (req, res) => {
    try {
        const { title, content, name } = req.body
        const result = await prisma.example.create({
            data: {
                title, 
                content, 
                name
                //img
            }
        })
        res.json(result)
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Could not add the entry:', error)
        }
    }
}

export const getExample = async (req, res) => {
    try {
        const result = await prisma.example.findMany()
        res.json(result)
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Entry not found:', error)
        }
    }
}

export const updateExample = async (req, res) => {
    try {
        const {id}= req.params
        const {title, content, name} = req.body
        const result = await prisma.example.update({
            where: {id: Number(id)},
            data: {title, content, name}
        })
        res.json(result)
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Entry not found')
        }
    }

}

export const deleteExample = async (req, res) => {
    try {
        const {id} = req.params
        const result = await prisma.example.delete({
            where: {id: Number(id)}
        })
        res.json(result)
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Could not delete entry')
        }
    } 
}