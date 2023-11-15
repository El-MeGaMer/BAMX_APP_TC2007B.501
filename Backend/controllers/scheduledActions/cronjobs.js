import cron from 'node-cron'
import { postBitacorasMadrugada } from './crearBitacoras.js'

function initScheduledJobs(){
    /*const cronJobExample = cron.schedule("52 16 * * *", () => {
        console.log("Hellow cron")
    })*/

    //Strings de cada horario
    //Sec,Min,Hora,Dia,Mes,Dia de la semana
    //Doc: https://www.npmjs.com/package/node-cron
    const horaCrearBitacorasMadrugada = "3 18 * * *"

    const crearBitacorasMadrugada = cron.schedule(horaCrearBitacorasMadrugada,postBitacorasMadrugada)

    //Inicia que se cuenten todos estos cron jobs
    //cronJobExample.start()
    crearBitacorasMadrugada.start()
}

export default initScheduledJobs