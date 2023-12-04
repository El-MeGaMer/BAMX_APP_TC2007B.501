const URL = "http://192.168.1.234:3000"

// Create Log for "Incidente" ---------------------------------------

export async function LoginUser(userData){
    const url = URL + "/login/verUser";
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    };
    const rawResponse = await fetch(url, options);
    const response = await rawResponse.json();
    return response;
}
