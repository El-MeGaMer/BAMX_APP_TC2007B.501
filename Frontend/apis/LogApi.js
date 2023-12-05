
const URL = "https://bamxapp-0yl3im8t.b4a.run"

// Create Log for "Incidente" ---------------------------------------

export async function CreateIncidente(idUser, area, desc, img) {
  const url = URL + "/bitacoras/Incidente/create/" + String(idUser);

  const formData = new FormData();
  formData.append("area", area);
  formData.append("descripcion", desc);

  if (typeof img === "string") {
    formData.append("photo", {
      uri: img,
      name: "photo.jpg",
      type: "image/jpg",
    });
  } else {
    formData.append("photo", img);
  }

  const options = {
    method: "POST",
    body: formData,
  };

  const rawResponse = await fetch(url, options);
  const response = await rawResponse.json();
  return response;
}

// Fill Logs APIs ----------------------------------------------------

// Function to fill Logs for the "Empaque" area

export async function UpdateLogEmpaque(idLog, idUser, body) {
  const userId = String(idUser);
  const logId = String(idLog);

  const url = URL + "/bitacoras/Empaque/" + logId + "/" + userId;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  const rawResponse = await fetch(url, options);
  const response = await rawResponse.json();
  return response;
}

// Function to fill Logs for the "Almacen" area

export async function UpdateLogAlmacen(idLog, idUser, body) {
  const userId = String(idUser);
  const logId = String(idLog);

  const url = URL + "/bitacoras/Almacen/" + logId + "/" + userId;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  const rawResponse = await fetch(url, options);
  const response = await rawResponse.json();
  return response;
}

// Function to fill Logs for the "Recibo" area

export async function UpdateLogRecibo(idLog, idUser, body) {
  try {
    const userId = String(idUser);
    const logId = String(idLog);

    const url = URL + "/bitacoras/Recibo/" + logId + "/" + userId;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const rawResponse = await fetch(url, options);
    const response = await rawResponse.json();
    
    return response;
  } catch (error) {
    console.log(error);
  }
}

// Actualizar Bitacora de Extintores
export async function updateLogExtintor(idLog, idUser, body) {
  try {
    const url = URL + "/bitacoras/Extintor/" + idLog;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const rawResponse = await fetch(url, options);
    const response = await rawResponse.json();
    return(response)
  } catch (error){
    console.warn(error)
  }
  }

// Actualizar Bitacora de Alimento Compartido
export async function updateLogAlimentoCompartido(idLog, idUser, body) {
  try {
    const url = URL + "/bitacoras/AlimentoCompartido/" + idLog + "/" + idUser;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  const rawResponse = await fetch(url, options);
  const response = await rawResponse.json();
  console.log("RESPONSE_API_YES");
    return(response)

  console.log("RESPONSE_API_YES");
    console.log(body)  
  } catch (error) {
    console.log(error)
  }
  
}

// Actualizar Bitacora de Criba FV
export async function updateLogCribaFV(idLog, idUser, body) {
  try {
    const url = URL + "/bitacoras/CribaFV/" + idLog + "/" + idUser;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const rawResponse = await fetch(url, options);
    const response = await rawResponse.json();
    console.log(JSON.stringify(response));
    return(response)
  } catch (error) {
    console.log(error);
  }
}

// Actualizar Bitacora de Entrega
export async function updateLogEntrega(idLog, idUser, body) {
  try {

    const url = URL + "/bitacoras/Entrega/" + idLog + "/" + idUser;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const rawResponse = await fetch(url, options);
    const response = await rawResponse.json();
    console.log(JSON.stringify(response));
    console.log("RESPONSE_API_YES");
    console.log(body)  
    return(response)
  } catch (error){
    console.log(error)
  }
}

// Actualizar Bitacora de Temperaturas
export async function updateLogTemperatura(idLog, idUser, body) {
  try {

    const url = URL + "/bitacoras/Temperatura/" + idLog;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const rawResponse = await fetch(url, options);
    const response = await rawResponse.json();
    console.log(JSON.stringify(response));
    return(response)
  } catch (error) {
    console.warn(error);
  }
}
