// AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile
} from "firebase/auth";
import { auth, googleProvider } from '../firebase/firebase'; // 确保路径正确

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const signup = async (email, password, username) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: username
            });
            // 更新用户信息
            setUser({
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                displayName: userCredential.user.displayName,
                // 其他需要的信息...
            });
            setIsLoggedIn(true);
        } catch (error) {
            // 处理注册错误
            throw error;
        }
    };

    const login = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            // 使用 Firebase 返回的用户信息
            setUser({
                uid: response.user.uid,
                email: response.user.email,
                displayName: response.user.displayName,
                // 其他需要的信息...
            });
            setIsLoggedIn(true);
        } catch (error) {
            // 处理登录错误
            console.error("Login error: ", error);
        }
    };

    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            setUser({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                // 其他需要的信息...
            });
            setIsLoggedIn(true);
        } catch (error) {
            console.error("Google login error: ", error);
        }
    };

    const logout = () => {
        auth.signOut();
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, signup, login, loginWithGoogle, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
