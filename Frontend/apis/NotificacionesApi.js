const URL = "http://192.168.1.234:3000"

export async function getNotifications(idUser){
    const url = URL + '/notificaciones/' + idUser;
    const options = {
        method: "GET",
    }
    const rawResponse = await fetch(url, options)
    const response = await rawResponse.json()
    return response
}