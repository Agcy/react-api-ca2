import React from 'react';
import LoginSignupTemplate from "../components/userInfo/loginSignupTemplate";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const LoginPage = ({ type }) => {

    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: 'linear-gradient(45deg, #9c27b0 30%, #ce93d8 90%)'
        }}>
            <Paper elevation={3} style={{
                padding: '20px',
                maxWidth: '400px',
                width: '100%',
                margin: '0 auto'
            }}>
                <LoginSignupTemplate type={type}/>
            </Paper>
        </Box>

    );
};

export default LoginPage;
