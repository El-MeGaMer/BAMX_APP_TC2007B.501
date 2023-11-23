
const URL = "http://localhost:3000"

// Create Log for "Incidente" ---------------------------------------

export async function CreateIncidente(area, desc, img){

    const url = URL + "/bitacoras/Incidente/create";

    const formData = new FormData();
    formData.append('area', area);
    formData.append('descripcion', desc);
    formData.append('photo', img);

    const options = {
        method: "POST",
        body: formData
    }

    const rawResponse = await fetch(url, options);
    const response = await rawResponse.json();
}

// Fill Logs APIs ----------------------------------------------------

// Function to fill Logs for the "Empaque" area

export async function UpdateLogEmpaque(idUser, idLog, body){

    const userId = String(idUser); 
    const logId = String(idLog);

    const url = URL + '/bitacoras/Empaque/' + logId + "/" + userId;
    const options = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
    const rawResponse = await fetch(url, options)
    const response = await rawResponse.json();
    return response;
}

// Function to fill Logs for the "Almacen" area

export async function UpdateLogAlmacen(idUser, idLog, body){

    const userId = String(idUser); 
    const logId = String(idLog);

    const url = URL + '/bitacoras/Empaque/' + logId + "/" + userId;
    const options = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
    const rawResponse = await fetch(url, options)
    const response = await rawResponse.json();
    return response;
}

// Function to fill Logs for the "Recibo" area

export async function UpdateLogRecibo(idUser, idLog, body){

    const userId = String(idUser); 
    const logId = String(idLog);

    const url = URL + '/bitacoras/Empaque/' + logId + "/" + userId;
    const options = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
    const rawResponse = await fetch(url, options)
    const response = await rawResponse.json();
    return response;
}

