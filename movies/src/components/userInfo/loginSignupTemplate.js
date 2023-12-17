import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Login from "./userLogin";
import UserSignup from './userSignup';
import { purple } from '@mui/material/colors';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const LoginSignupTemplate = ({ type }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [value, setValue] = useState(type === 'signup' ? 1 : 0);

    useEffect(() => {
        switch (location.pathname) {
            case '/user/login':
                setValue(0);
                break;
            case '/user/signup':
                setValue(1);
                break;
        }
    }, [location]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        switch (newValue) {
            case 0:
                navigate('/user/login');
                break;
            case 1:
                navigate('/user/signup');
                break;
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    variant="fullWidth" // 使 Tabs 充满整个容器宽度
                    sx={{
                        '.MuiTabs-indicator': {
                            backgroundColor: purple[500],
                        }
                    }}
                >
                    <Tab label="Login" {...a11yProps(0)} sx={{ width: '50%', color: purple[700] }} />
                    <Tab label="Sign up" {...a11yProps(1)} sx={{ width: '50%', color: purple[700] }} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <Typography component="div">{/* 使用 div 替代 p */}
                    <Login/>
                </Typography>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <Typography component="div">{/* 使用 div 替代 p */}
                    <UserSignup/>
                </Typography>
            </CustomTabPanel>
        </Box>
    );
}

export default LoginSignupTemplate
