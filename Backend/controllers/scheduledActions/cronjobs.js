import cron from 'node-cron'
import { postBitacorasMadrugada } from './crearBitacoras.js'
import { fetchNotifications } from '../notificaciones_controller.js'
import { sendNotifMail } from '../mails_controller.js'

function initScheduledJobs(){
    /*const cronJobExample = cron.schedule("52 16 * * *", () => {
        console.log("Hellow cron")
    })*/

    //Strings de cada horario
    //Sec,Min,Hora,Dia,Mes,Dia de la semana
    //Doc: https://www.npmjs.com/package/node-cron
    const horaCrearBitacorasMadrugada = "0 4 * * *"
    const horaEscanearPorNotifs = "* * * * *"

    const crearBitacorasMadrugada = cron.schedule(horaCrearBitacorasMadrugada,postBitacorasMadrugada)
    
    //EscanearPorNotifs para el mail
    const EscanearPorNotifs = cron.schedule(horaEscanearPorNotifs, async () => {
        const currentTime = new Date();
        const lastMinute = new Date(currentTime);
        lastMinute.setMinutes(currentTime.getMinutes() - 10000000);
      
        const notifications = await fetchNotifications(lastMinute, currentTime);
      
        //console.log('Notifications found:', notifications);
        
        for(const i in notifications){
            console.log("aaaa")
            sendNotifMail(notifications[i])
        }
      })


    //Inicia que se cuenten todos estos cron jobs
    //cronJobExample.start()
    crearBitacorasMadrugada.start()
    EscanearPorNotifs.start()
}

export default initScheduledJobs