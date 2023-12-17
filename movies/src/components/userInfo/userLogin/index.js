import React, {useState} from 'react';
import {useAuth} from '../../../contexts/authContext';
import {useNavigate} from 'react-router-dom';
import TextField from "@mui/material/TextField";
import Paper from '@mui/material/Paper';
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import MailIcon from '@mui/icons-material/Mail';
import {purple} from "@mui/material/colors";
import {googleProvider} from "../../../firebase/firebase";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // 新增错误状态
    const {login, loginWithGoogle} = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            setError(''); // 清除之前的错误消息
            await login(email, password); // 使用 email 和 password 调用 login 函数
            navigate('/'); // 导航到主页或其他页面
        } catch (error) {
            // 捕获并显示错误消息
            setError('Failed to log in');
            console.error("Login error: ", error);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setError(''); // 清除之前的错误消息
            await loginWithGoogle(googleProvider);
            navigate('/'); // 导航到主页或其他页面
        } catch (error) {
            setError('Failed to log in');
            console.error('Error during Google login:', error);
        }
    };
    return (
        <>
            <TextField
                id="outlined-email"
                type="email"
                value={email}
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
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
                id="outlined-password"
                type="password"
                value={password}
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                fullWidth
                margin="normal"
                sx={{
                    input: { color: purple[700] },
                    label: { color: purple[700] },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: purple[500] },
                        '&:hover fieldset': { borderColor: purple[700] },
                    }
                }}
            />
            <Button
                onClick={handleGoogleLogin}
            >
                <MailIcon/>
                login with google
            </Button>
            <Button
                onClick={handleLogin}
                fullWidth
                margin="normal"
                sx={{
                    height: 70,
                    backgroundColor: purple[500], // 按钮背景颜色
                    color: 'white', // 按钮文字颜色
                    '&:hover': {
                        backgroundColor: purple[700], // 悬停时按钮背景颜色
                    },
                }}
            >
                Login
            </Button>
        </>
    )
        ;
};

export default Login;
