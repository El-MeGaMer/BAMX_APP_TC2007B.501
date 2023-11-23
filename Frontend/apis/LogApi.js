
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

// Actualizar Bitacora de Extintores
export async function updateLogExtintor(idLog, body) {
    const url = URL + '/bitacoras/Extintor/' + idLog;
    const options = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
    const rawResponse = await fetch(url, options)
    const response = await rawResponse.json();
    console.log(JSON.stringify(response))
}

// Actualizar Bitacora de Alimento Compartido
export async function updateLogAlimentoCompartido(idLog, idUser, body){
    const url = URL + '/bitacoras/AlimentoCompartido/' + idLog + '/' + idUser;
    const options = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(body)
    }
    const rawResponse = await fetch(url, options)
    const response = await rawResponse.json();
    console.log(JSON.stringify(response))
}

// Actualizar Bitacora de Criba FV
export async function updateLogCribaFV(idLog, idUser, body){
    const url = URL + '/bitacoras/CribaFV/' + idLog + '/' + idUser;
    const options = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(body)
    }
    const rawResponse = await fetch(url, options)
    const response = await rawResponse.json();
    console.log(JSON.stringify(response))
}

// Actualizar Bitacora de Entrega
export async function updateLogEntrega(idLog, idUser, body){
    const url = URL + '/bitacoras/Entrega/' + idLog + '/' + idUser;
    const options = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(body)
    }
    const rawResponse = await fetch(url, options)
    const response = await rawResponse.json();
    console.log(JSON.stringify(response))
}

// Actualizar Bitacora de Temperaturas
export async function updateLogExtintor(idLog, body) {
    const url = URL + '/bitacoras/Temperatura/' + idLog;
    const options = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
    const rawResponse = await fetch(url, options)
    const response = await rawResponse.json();
    console.log(JSON.stringify(response))
}

