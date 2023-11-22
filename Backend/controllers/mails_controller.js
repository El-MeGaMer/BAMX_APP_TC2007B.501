import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: 'banmxprueba@gmail.com',
        pass: process.env.MAIL_PASSWORD
    }
});

transporter.verify().then(() => {
    console.log('Ready to send emails')
})

export async function sendNotifMail(notif) {
    try {
        const usuarios = notif.usuarios
        
        //Crea una lista con los correos que requiere la notificacion
        let destination = ""
        for (const i in usuarios) {
            destination = destination + usuarios[i].usuario.correo + ", "
        }

        const info = await transporter.sendMail({
            from: '"Bamx" <banmxprueba@gmail.com>', // sender address
            to: destination, // list of receivers
            subject: notif.titulo, // Subject line
            text: notif.descripcion, // plain text body
            html: notif.descripcion, // html body
        })
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Error! Could not add the entry:', error)
        }
    }
}