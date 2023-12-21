import React, {useState, createContext} from "react";
import {
    getUserFavorites,
    getUserFollowedActors,
    getUserMarkedMovies,
    getUserMovieReviews,
    login,
    signup
} from "../api/tmdb-api";

export const AuthContext = createContext(null);

const MongoAuthContextProvider = (props) => {
    const existingToken = localStorage.getItem("token");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authToken, setAuthToken] = useState(existingToken);
    const [account, setAccount] = useState("");
    const [user, setUser] = useState(null)
    const [msg, setMsg] = useState("")

    //Function to put JWT token in local storage.
    const setToken = (data) => {
        localStorage.setItem("token", data);
        setAuthToken(data);
    }

    const authenticate = async (account, password) => {
        const result = await login(account, password);
        console.log(result)
        if (!result.error) {
            setToken(result.token);
            setIsAuthenticated(true);
            setAccount(account);
            setUser(result.user);
            localStorage.setItem('userId', result.user.id);
            return { success: true, status: result.status, message: result.message };
        } else {
            // 返回包含错误信息的对象
            setMsg(result.message || 'Failed to Login');
            return { success: false, status: result.status, message: result.message };
        }
    };

    const register = async (username, email, password) => {
        try {
            const result = await signup(username, email, password);
            console.log("111"+result)
            if (!result.error) {
                setToken(result.token);
                setIsAuthenticated(true);
                setAccount(account);
                setUser(result.user);
                return { success: true, message: result.msg };
            } else {
                setMsg(result.message || 'Failed to register');
                return { success: false,status: result.status, message: result.message };
            }
        } catch (error) {
            setMsg(error.message || 'An unexpected error occurred');
            return { success: false, message: error.message };
        }
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
                user,
                msg
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default MongoAuthContextProvider;
