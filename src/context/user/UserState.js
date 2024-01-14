import { useState } from "react";
import UserContext from "./UserContext";


const UserState = (props) => {

    const [user, setUser] = useState(null);
    const getCurrentUser = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setUser(null)
        }


        const response = await fetch("http://localhost:8000/api/user/load-profile", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`
            },
        });
        const data = await response.json();
        if (data.success) {
            setUser(response.data)

        }
        else {
            setUser(null)
        }
    }


    return (
        <UserContext.Provider value={{ user, getCurrentUser }}>
            {props.children}
        </UserContext.Provider >
    )
}

export default UserState