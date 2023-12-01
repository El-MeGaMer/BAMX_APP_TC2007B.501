const URL = "http://192.168.1.234:3000"

// Returns all the logs separated by year, week and type

export async function getLogExport(){
    const url = URL + '/bitacoras/export';
    const options = {
        method: "GET",
    }
    const rawResponse = await fetch(url, options)
    const response = await rawResponse.json()
    return response
}

// Returns all the logs with status "enRevision"
// & "revisados"

export async function getLogPending(){
    const url = URL + '/bitacoras/pending';
    const options = {
        method: "GET",
    }
    const rawResponse = await fetch(url, options)
    const response = await rawResponse.json()
    return response
}

// Gives the logs for the day

export async function getLogsAvailable(id){

    const userId = String(id)

    const url = URL + '/bitacoras/display/' + userId;
    const options = {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    }
    const rawResponse = await fetch(url, options)
    const response = await rawResponse.json()
    return response
}

// Returns all the logs the given status variable

export async function getLogsState(status){
    const logStatus = String(status)

    const url = URL + '/bitacoras/' + logStatus;
    const options = {
        method: "GET",
    }
    const rawResponse = await fetch(url, options)
    const response = await rawResponse.json()
    return response
}

// Get recibos by LogId
export async function getRecibo(logId) {
    const url = `${URL}/bitacoras/Recibo/${logId}`;

    const res = await fetch(url, {
        method: "GET",
    })
    const response = await res.json();
    return response;
}

// Get empaques by LogId
export async function getEmpaque(logId) {
    const url = `${URL}/bitacoras/Empaque/${logId}`;

    const res = await fetch(url, {
        method: "GET",
    })
    const response = await res.json();
    return response;
}

// Get almacen by LogId
export async function getAlmacen(logId) {
    const url = `${URL}/bitacoras/Almacen/${logId}`;

    const res = await fetch(url, {
        method: "GET",
    })
    const response = await res.json();
    return response;
}

// Get extintores by LogId
export async function getExtintor(logId) {
    const url = `${URL}/bitacoras/Extintor/${logId}`;

    const res = await fetch(url, {
        method: "GET",
    })
    const response = await res.json();
    return response;
}

// Get entregas by LogId
export async function getEntrega(logId) {
    const url = `${URL}/bitacoras/Entrega/${logId}`;

    const res = await fetch(url, {
        method: "GET",
    })
    const response = await res.json();
    return response;
}

// Get alimento compartido by LogId
export async function getAlimentoCompartido(logId) {
    const url = `${URL}/bitacoras/AlimentoCompartido/${logId}`;

    const res = await fetch(url, {
        method: "GET",
    })
    const response = await res.json();
    return response;
}

// Get temperatura by LogId
export async function getTemperatura(logId) {
    const url = `${URL}/bitacoras/Temperatura/${logId}`;

    const res = await fetch(url, {
        method: "GET",
    })
    const response = await res.json();
    return response;
}

// Get cribaFV by LogId
export async function getCribaFV(logId) {
    const url = `${URL}/bitacoras/CribaFV/${logId}`;

    const res = await fetch(url, {
        method: "GET",
    })
    const response = await res.json();
    return response;
}

// Get recordatorios
export async function getRecordatorios() {
    const url = `${URL}/recordatorio/`;
    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
        },
    })
    const response = await res.json();
    return response;
}