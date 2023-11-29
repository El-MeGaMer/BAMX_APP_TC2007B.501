import { useState, useEffect } from "react";
import * as SecureStore from 'expo-secure-store';


export function useAuth(verified) {
	const [loggedIn, setLoggedIn] = useState(false);
	const [role, setRole] = useState("");
	const [id, setID] = useState(0);

	useEffect(() => {
		async function checkLoggedIn() {
			let result = await SecureStore.getItemAsync("token");

			// put your ip here if testing
			const serverIP = "10.41.33.24" 

			if (result) {
				fetch(`http://${serverIP}:3000/login/auth`, {
					method: "POST",
					headers: { 
						"Content-Type": "application/json" 
					},
					body: JSON.stringify({ token: result })
				})
					.then((res) => {
						if (res.status == 200) {
							setLoggedIn(true);
							res.json().then((body) => {
								setRole(body.rol);
								setID(body.id);
							});
						}
						else
							console.log("Invalid token, request login again");
					});
			} else {
				console.log("Not logged in");
			}
		}

		checkLoggedIn();

	}, [verified]);

	return [loggedIn, role, id];
}
