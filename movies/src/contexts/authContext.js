// AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile
} from "firebase/auth";
import { login, signup } from "../api/tmdb-api";
import { auth, googleProvider } from '../firebase/firebase'; // 确保路径正确

export const AuthContext = createContext(null);

export const AuthProvider = ({ props }) => {
    const existingToken = localStorage.getItem("token");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authToken, setAuthToken] = useState(existingToken);
    const [userName, setUserName] = useState("");

    //Function to put JWT token in local storage.
    const setToken = (data) => {
        localStorage.setItem("token", data);
        setAuthToken(data);
    }

    const register = async (username, email, password) => {
        const result = await signup(username, email, password);
        console.log(result.code);
        return (result.code == 201) ? true : false;
    };

    const authenticate = async (username, password) => {
        const result = await login(username, password);
        if (result.token) {
            setToken(result.token)
            setIsAuthenticated(true);
            setUserName(username);
        }
    };

    // const authenticateWithGoogle = async () => {
    //     try {
    //         // Verify the token with Firebase
    //         const firebaseUser = await auth.verifyIdToken(token);
    //
    //         // Extract user data from the Firebase token
    //         const userData = {
    //             uid: firebaseUser.uid,
    //             email: firebaseUser.email,
    //             displayName: firebaseUser.displayName,
    //             // Add other data as needed
    //         };
    //
    //         // Check if the user already exists in MongoDB
    //         let user = await UserModel.findOne({ uid: userData.uid });
    //
    //         if (!user) {
    //             // If the user doesn't exist, create a new one
    //             user = new UserModel(userData);
    //             await user.save();
    //         }
    //
    //         // Return some user data or token for the client
    //         return { status: 'success', user };
    //     } catch (error) {
    //         // Handle errors
    //         console.error('Error authenticating with Google:', error);
    //         return { status: 'error', message: error.message };
    //     }
    // };

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
                userName
        }}>
            {props}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
