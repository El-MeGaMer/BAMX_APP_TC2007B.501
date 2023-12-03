import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import validator from 'validator';


export const auth = (req, res) => {
    try{
    dotenv.config();

    const token = req.body.token;
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err)
            res.status(400).json({ error: "Invalid token" });
        else
            res.status(200).json({ message: "Valid token", rol: decoded.rol, id: decoded.id });
    });
    }
    catch(error){
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Could not add the entry:', error)
        }
    }
}

export const genOTP = async (req, res) => {
    try{

    const prisma = new PrismaClient();

    if (!req.body || !req.body.email || !validator.isEmail(req.body.email)) {
        res.status(400).json({ error: "Correo inválido" });
        return;
    }


    const user = await prisma.usuarios.findUnique({
        where: {
            correo: req.body.email
        }
    });

    if (user) {
            const token = jwt.sign({ email: req.body.email, rol: user.idRol, id: user.id }, process.env.SECRET, { expiresIn: 100000 });
            res.status(200).json({ token });

    } else {
        res.status(400).json({ error: "Usuario no existe" });
        return;
    }
}

catch(error){
    if (process.env.NODE_ENV !== 'test') {
        console.log('Error! Could not add the entry:', error)
    }
}
}
