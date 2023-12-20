import React, {useState, useContext} from 'react';
import TextField from "@mui/material/TextField";
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../../../contexts/mongoAuthContext';
import Button from "@mui/material/Button";
import {purple} from '@mui/material/colors';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Box from "@mui/material/Box"; // 引入 Alert 组件显示错误消息

// TODO: 保证注册完成后无需再另外登录一次即可达到登陆状态

const UserSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [errorType, setErrorType] = useState('');
    const navigate = useNavigate();
    const context = useContext(AuthContext)

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setErrorType('warning');
            return;
        }

        try {
            console.log(123)
            const {success, status, message} = await context.register(username, email, password);
            console.log(456)
            if (success === true) {
                setError('Account successfully created');
                setErrorType('success');
                navigate('/');
            } else {
                console.log("222"+success+message)
                switch (status) {
                    case 400:
                        setError(status+" "+message || 'Invalid request');
                        setErrorType('warning');
                        break;
                    case 500:
                        setError(status+" "+message || 'Server error');
                        setErrorType('error');
                        break;
                    default:
                        setError('An unknown error occurred');
                        setErrorType('info');
                }
            }
        } catch (error) {
            setError(error.message || 'Failed to create an account');
            setErrorType('error');
        }
    };


    return (
        <Box>
            {error && (
                <Stack sx={{width: '100%'}} spacing={2}>
                    <Alert severity={errorType}>{error}</Alert>
                </Stack>
            )}
            <TextField
                id="signup-username"
                type="text"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                margin="normal"
                sx={{
                    input: {color: purple[700]}, // 输入文字颜色
                    label: {color: purple[700]}, // 标签文字颜色
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {borderColor: purple[500]}, // 边框颜色
                        '&:hover fieldset': {borderColor: purple[700]}, // 悬停时边框颜色
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
                    input: {color: purple[700]}, // 输入文字颜色
                    label: {color: purple[700]}, // 标签文字颜色
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {borderColor: purple[500]}, // 边框颜色
                        '&:hover fieldset': {borderColor: purple[700]}, // 悬停时边框颜色
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
                    input: {color: purple[700]}, // 输入文字颜色
                    label: {color: purple[700]}, // 标签文字颜色
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {borderColor: purple[500]}, // 边框颜色
                        '&:hover fieldset': {borderColor: purple[700]}, // 悬停时边框颜色
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
                    input: {color: purple[700]}, // 输入文字颜色
                    label: {color: purple[700]}, // 标签文字颜色
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {borderColor: purple[500]}, // 边框颜色
                        '&:hover fieldset': {borderColor: purple[700]}, // 悬停时边框颜色
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
        </Box>
    );
};

export default UserSignup;
