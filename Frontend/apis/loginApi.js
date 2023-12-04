const URL = "https://bamxapp-0yl3im8t.b4a.run"

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
