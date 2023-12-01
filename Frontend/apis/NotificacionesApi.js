const URL = "http://localhost:3000"

export async function getNotifications(idUser){
    const url = URL + '/notificaciones/' + idUser;
    const options = {
        method: "GET",
    }
    const rawResponse = await fetch(url, options)
    const response = await rawResponse.json()
    return response
}