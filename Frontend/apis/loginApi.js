const URL = "https://bamxappbeta1-9vnkyt5y.b4a.run"

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
