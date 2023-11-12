import cron from 'node-cron'

function initScheduledJobs(){
    /*const cronJobExample = cron.schedule("52 16 * * *", () => {
        console.log("Hellow cron")
    })*/

    //Strings de cada horario
    //Sec,Min,Hora,Dia,Mes,Dia de la semana
    //Doc: https://www.npmjs.com/package/node-cron
    horaCrearBitacorasMadrugada = "0 4 * * *"
    horaCrearBitacoraTemperatura1 = "0 7 * * *"
    horaCrearBitacoraTemperatura2 = "0 11 * * *"
    horaCrearBitacoraTemperatura3 = "0 15 * * *"
    horaCrearBitacoraTemperatura4 = "0 18 * * *"

    const crearBitacorasMadrugada = cron.schedule(horaCrearBitacorasMadrugada, () => {
        console.log("Creame todas las bitacora a las 4")
    })

    const crearBitacoraTemperatura1 = cron.schedule(horaCrearBitacoraTemperatura1, () => {
        console.log("Creame una bitacora de temperatura a las 7")
    })

    const crearBitacoraTemperatura2 = cron.schedule(horaCrearBitacoraTemperatura2, () => {
        console.log("Creame una bitacora de temperatura a las 11")
    })
    
    const crearBitacoraTemperatura3 = cron.schedule(horaCrearBitacoraTemperatura3, () => {
        console.log("Creame una bitacora de temperatura a las 15")
    })

    const crearBitacoraTemperatura4 = cron.schedule(horaCrearBitacoraTemperatura4, () => {
        console.log("Creame una bitacora de temperatura a las 18")
    })

    //Inicia que se cuenten todos estos cron jobs
    //cronJobExample.start()
    crearBitacorasMadrugada.start()
    crearBitacoraTemperatura1.start()
    crearBitacoraTemperatura2.start()
    crearBitacoraTemperatura3.start()
    crearBitacoraTemperatura4.start()
}

export default initScheduledJobsgit