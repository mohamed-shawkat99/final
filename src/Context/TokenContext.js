import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const UserToken = createContext();

export default function TokenContextProvider(props) {
    const [Token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("userToken");

        if (token) {
            try {
                const { id } = jwtDecode(token);
                setUserId(id);
                setToken(token);
            } catch (error) {
                console.error("Invalid token:", error);
                localStorage.removeItem("userToken");
            }
        }
    }, []);

    return (
        <UserToken.Provider value={{ Token, setToken, userId }}>
            {props.children}
        </UserToken.Provider>
    );
}
