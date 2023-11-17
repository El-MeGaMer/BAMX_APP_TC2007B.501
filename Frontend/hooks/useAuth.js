import { useState, useEffect } from "react";
import * as SecureStore from 'expo-secure-store';


export function useAuth(verified) {
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		async function checkLoggedIn() {
			let result = await SecureStore.getItemAsync("token");

			// put your ip here if testing
			const serverIP = "" 

			if (result) {
				fetch(`http://${serverIP}:3000/login/auth`, {
					method: "POST",
					headers: { 
						"Content-Type": "application/json" 
					},
					body: JSON.stringify({ token: result })
				})
					.then((res) => {
						if (res.status == 200)
							setLoggedIn(true);
						else
							console.log("Invalid token, request login again");
					});
			} else {
				console.log("Not logged in");
			}
		}

		checkLoggedIn();

	}, [verified]);

	return loggedIn;
}
