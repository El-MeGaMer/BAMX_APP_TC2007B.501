const URL = "https://bamxapp-0yl3im8t.b4a.run"

export async function getNotifications(idUser){
    const url = URL + '/notificaciones/' + idUser;
    const options = {
        method: "GET",
    }
    const rawResponse = await fetch(url, options)
    const response = await rawResponse.json()
    return response
}