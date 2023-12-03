import { PrismaClient } from "@prisma/client"
import otpGenerator from "otp-generator"
import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import bcrypt from "bcrypt"
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

export const verifyOTP = async (req, res) => {
    try{
    dotenv.config();
    const userEmail = req.body.email;
    const inputOTP = req.body.otp;

    // Extract OTP from database
    const prisma = new PrismaClient();

    const user = await prisma.usuarios.findUnique({
        where: {
            correo: userEmail
        }
    });

    if (!user) {
        res.status(400).json({ error: "User not even registered!" });
    } else {
        const OTP = user.otp;
        const expirationDate = user.expiracion;
        const currentDate = new Date();

        // Check if OTP is equal to the one in database and has not expired
        if (!bcrypt.compareSync(inputOTP, OTP) || expirationDate < currentDate) {
            res.status(400).json({ error: "Invalid OTP" });
        } else {
            const token = jwt.sign({ email: userEmail, rol: user.idRol, id: user.id }, process.env.SECRET, { expiresIn: 100000 });
            res.status(200).json({ token });
        }
    }
}
catch(error){
    if (process.env.NODE_ENV !== 'test') {
        console.log('Error! Could not add the entry:', error)
    }
}
}
