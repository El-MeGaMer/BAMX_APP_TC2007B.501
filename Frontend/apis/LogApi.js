
const URL = "http://localhost:3000"

// Function to export 
export async function LogEmpaque(idUser, idLog, body){
    const url = URL + '/bitacoras/Empaque/' + idLog + "/" + idUser;
    const options = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
    const rawResponse = await fetch(url, options)
    const response = await rawResponse.json();
    //console.log(JSON.stringify(response))
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