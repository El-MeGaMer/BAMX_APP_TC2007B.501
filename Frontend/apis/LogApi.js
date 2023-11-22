
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