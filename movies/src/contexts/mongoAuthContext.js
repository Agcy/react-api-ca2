import React, { useState, createContext } from "react";
import { login, signup } from "../api/tmdb-api";

export const AuthContext = createContext(null);

const MongoAuthContextProvider = (props) => {
    const existingToken = localStorage.getItem("token");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authToken, setAuthToken] = useState(existingToken);
    const [account, setAccount] = useState("");
    const [user, setUser] = useState(null)

    //Function to put JWT token in local storage.
    const setToken = (data) => {
        localStorage.setItem("token", data);
        setAuthToken(data);
    }

    const authenticate = async (account, password) => {
        const result = await login(account, password);
        if (result.token) {
            setToken(result.token)
            setIsAuthenticated(true);
            setAccount(account);
            setUser(result.user);
        }
    };

    const register = async (username, email, password) => {
        const result = await signup(username, email, password);
        console.log(result.code);
        return (result.code == 201) ? true : false;
    };

    const signout = () => {
        setTimeout(() => setIsAuthenticated(false), 100);
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                authenticate,
                register,
                signout,
                account,
                user
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default MongoAuthContextProvider;
