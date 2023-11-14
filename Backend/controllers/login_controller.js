import { PrismaClient } from "@prisma/client"
import otpGenerator from "otp-generator"
import nodemailer from "nodemailer"

export const genOTP =  async (req, res) => {

    // Generate OTP
    const OTP = otpGenerator.generate(6, 
      {lowerCaseAlphabets: false, 
      upperCaseAlphabets: false, 
      specialChars: false});

    // Store in database under email and add expiration date of 60s
    const prisma = new PrismaClient();

    const user = await prisma.usuarios.findUnique({
        where : {
            correo: req.body.email 
        }
    });

    const date = new Date();
    date.setSeconds(date.getSeconds() + 120);

    if (user) {
    await prisma.user.update({
        where : {
            correo: req.body.email
        },
        data: {
            otp: Number(OTP),
            expiracion: date
        }
    });
    } else {
        res.status(400).json({error : "User does not exist"});
    }

    // Send email

    // put your ip here if you wish to test
    const expoIP = "";
    const emailMessage = `<a href='exp://${expoIP}/?otp=${OTP}&email=${req.body.email}'> Click para login </a>` ;

    const transporter = nodemailer.createTransport({
        host: "smtp.zoho.com",
        port: 465,
        secure: true,
        auth: {
          user: "johnlikesboneless@zohomail.com",
          pass: "ryLkF[6t?s%YSU.NQvG~R:"
        }
    });

    // text -> html when fixed
    const mailOptions = {
        from: "John Fahldo <johnlikesboneless@zohomail.com",
        to: req.body.email,
        subject: "OTP",
        text: emailMessage 
    }

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            res.status(400).json({error});
        } else {
            res.status(200).json({message: "Success"});
        }
    })
}

export const verifyOTP = async(req, res) => {
    const userEmail = req.body.email;
    const inputOTP = req.body.otp;

    // Extract OTP from database
    const prisma = new PrismaClient();

    const user = await prisma.usuarios.findUnique({
        where : {
            correo: userEmail 
        }
    });

    if (!user)
        res.status(400).json({error: "User not even registered!"});
    else {
        OTP = user.otp;
        expirationDate = user.expires;
        currentDate = new Date();

        // Check if OTP is equal to the one in database and has not expired
        if (inputOTP != OTP || expirationDate < currentDate) {
            res.status(400).json({error: "Invalid OTP"});
        } else {
            res.status(200).json({message: "Success"});
        }
    }
}
