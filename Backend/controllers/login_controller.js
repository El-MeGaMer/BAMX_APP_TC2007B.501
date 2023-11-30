import { PrismaClient } from "@prisma/client"
import otpGenerator from "otp-generator"
import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import validator from 'validator';


export const auth = (req, res) => {
	dotenv.config();

	const token = req.body.token;
	jwt.verify(token, process.env.SECRET, (err, decoded) => {
		if (err)
			res.status(400).json({ error: "Invalid token" });
		else
			res.status(200).json({ message: "Valid token", rol: decoded.rol, id: decoded.id });
	});
}

export const genOTP =  async (req, res) => {
    // Generate OTP
    const OTP = otpGenerator.generate(6, 
      {lowerCaseAlphabets: false, 
      upperCaseAlphabets: false, 
      specialChars: false});

    // Store in database under email and add expiration date of 120s
    const prisma = new PrismaClient();

	if (!req.body || !req.body.email || !validator.isEmail(req.body.email)) {
		res.status(400).json({error : "Correo inválido"});
		return;
	}

    const user = await prisma.usuarios.findUnique({
        where : {
            correo: req.body.email 
        }
    });

    const date = new Date();

    date.setSeconds(date.getSeconds() + 120);

	const salt = bcrypt.genSaltSync(10);
	const hashedOTP = bcrypt.hashSync(OTP, salt);

    if (user) {
    await prisma.usuarios.update({
        where : {
            correo: req.body.email
        },
        data: {
            otp: hashedOTP,
            expiracion: date
        }
    });
    } else {
        res.status(400).json({error : "Usuario no existe"});
		return;
    }

    // Send email

	// put your ip (with expo port) here if you wish to test. for installed apps maybe 127.0.0.1? or expo link if published
	const expoIP = "";
    const emailMessage = `<a href='exp://${expoIP}/?otp=${OTP}&email=${req.body.email}'> Click para login </a>` ;

	console.log(emailMessage);
    const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: {
			user: 'banmxprueba@gmail.com',
			pass: process.env.MAIL_PASSWORD
		}
    });

    const mailOptions = {
		from: "BAMX <lider_area_test_bamx@bahermosillo.org.mx>",
        to: req.body.email,
        subject: "OTP",
        html: emailMessage 
    }

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
			res.status(400).json({error: "Error enviando correo. Intente de nuevo."});
        } else {
            res.status(200).json({message: "Success"});
        }
    })
}

export const verifyOTP = async(req, res) => {
	dotenv.config();
    const userEmail = req.body.email;
    const inputOTP = req.body.otp;

    // Extract OTP from database
    const prisma = new PrismaClient();

    const user = await prisma.usuarios.findUnique({
        where : {
            correo: userEmail 
        }
    });

    if (!user) {
        res.status(400).json({error: "User not even registered!"});
	} else {
	    const OTP = user.otp;
	    const expirationDate = user.expiracion;
	    const currentDate = new Date();

	    // Check if OTP is equal to the one in database and has not expired
	    if (!bcrypt.compareSync(inputOTP, OTP) || expirationDate < currentDate) {
	        res.status(400).json({error: "Invalid OTP"});
	    } else {
			const token = jwt.sign({ email: userEmail, rol: user.idRol, id: user.id }, process.env.SECRET, { expiresIn: 100000 }); 
			res.status(200).json({ token });
        }
    }
}
