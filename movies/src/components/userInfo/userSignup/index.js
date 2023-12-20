import React, { useState, useContext } from 'react';
import TextField from "@mui/material/TextField";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/mongoAuthContext';
import Button from "@mui/material/Button";
import { purple } from '@mui/material/colors';
import Alert from '@mui/material/Alert'; // 引入 Alert 组件显示错误消息

// TODO: 保证注册完成后无需再另外登录一次即可达到登陆状态

const UserSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const context = useContext(AuthContext)

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            await context.register(username, email, password); // 调用 AuthContext 中的 signup
            navigate('/');
        } catch (error) {
            setError("Failed to create an account: " + error.message);
        }
    };


    return (
        <>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
                id="signup-username"
                type="text"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                margin="normal"
                sx={{
                    input: { color: purple[700] }, // 输入文字颜色
                    label: { color: purple[700] }, // 标签文字颜色
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: purple[500] }, // 边框颜色
                        '&:hover fieldset': { borderColor: purple[700] }, // 悬停时边框颜色
                    }
                }}
            />
            <TextField
                id="signup-email"
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
                sx={{
                    input: { color: purple[700] }, // 输入文字颜色
                    label: { color: purple[700] }, // 标签文字颜色
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: purple[500] }, // 边框颜色
                        '&:hover fieldset': { borderColor: purple[700] }, // 悬停时边框颜色
                    }
                }}
            />
            <TextField
                id="signup-password"
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
                sx={{
                    input: { color: purple[700] }, // 输入文字颜色
                    label: { color: purple[700] }, // 标签文字颜色
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: purple[500] }, // 边框颜色
                        '&:hover fieldset': { borderColor: purple[700] }, // 悬停时边框颜色
                    }
                }}
            />
            <TextField
                id="signup-confirm-password"
                type="password"
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
                margin="normal"
                sx={{
                    input: { color: purple[700] }, // 输入文字颜色
                    label: { color: purple[700] }, // 标签文字颜色
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: purple[500] }, // 边框颜色
                        '&:hover fieldset': { borderColor: purple[700] }, // 悬停时边框颜色
                    }
                }}
            />
            <Button
                onClick={handleSignup}
                fullWidth
                margin="normal"
                sx={{
                    height: 70,
                    backgroundColor: purple[500],
                    color: 'white',
                    '&:hover': {
                        backgroundColor: purple[700],
                    },
                }}
            >
                Sign Up
            </Button>
        </>
    );
};

export default UserSignup;
