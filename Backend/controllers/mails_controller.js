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

export async function sendNotifMail(){
    const info = await transporter.sendMail({
        from: '"Bamx" <banmxprueba@gmail.com>', // sender address
        to: "RamirezSantiago244@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    })
    console.log("Message sent: %s", info.messageId);
}