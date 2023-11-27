const URL = "http://10.41.34.161:3000"

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