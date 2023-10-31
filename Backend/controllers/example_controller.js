
import { PrismaClient } from "@prisma/client"
//import multer from "multer"

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

export const getExampleById = async (req, res) => {
    try {
        const {id} =req.params
        const result = await prisma.example.findUnique({
            where :{id: Number(id)}
        })
        res.json(result)
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Could not add the entry:', error)
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

//TO DO: See better options for mobile apps

// const storage = multer.memoryStorage()

// const upload = multer({ storage: storage })

// export const postExampleImg = async (req, res) => {
//     console.log(req.file)
//     if (req.file) {
//         try {
//         const newImage = await prisma.post.create({
//             data: {
//             title:"Titulo",
//             content:"hola",
//             name: req.file.originalname,
//             img: Buffer.from(req.file.buffer),
//             }
//         });

//         console.log('Imagen guardada en la base de datos:', newImage);
//         res.sendStatus(200);
//         } catch (error) {
//         console.error('Error al guardar la imagen en la base de datos:', error);
//         res.sendStatus(500);
//         }
//     } else {
//         res.sendStatus(400);
//     }
// }

// export const getExampleImg = async (req, res) => {
//     const id = req.params.id;
//     const image = await prisma.post.findUnique({
//         where: { id: Number(id) },
//     })

//     if (image) {
//         const imgBuffer = image.img; 
//         const contentType = 'image/png'; 
//         console.log('hola')
//         res.type(contentType);
//         res.end(imgBuffer);
//     } else {
//         res.end('No Img with that Id!');
//     }
// }