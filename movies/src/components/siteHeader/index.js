import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Avatar from '@mui/material/Avatar';
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // 导入退出图标
import { useAuth } from "../../contexts/authContext"; // 确保路径正确

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
    const { isLoggedIn, user, logout } = useAuth();
    const [state, setState] = useState({ MY: false });
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const menuOptions = [
        { label: "Home", path: "/" },
        { label: "Trending", path: "/movies/trending" },
        { label: "Upcoming", path: "/movies/upcoming" },
        { label: "Actor", path: "/actors" }
    ];

    const myOptions = [
        { label: "Favorites", path: "/movies/favorites" },
        { label: "Marked", path: "/movies/marked" },
        { label: "Followed", path: "/actors/followed" }
    ];

    const handleMyClick = () => {
        if (!isLoggedIn) {
            navigate('/user/login');
        } else {
            setState({ MY: true });
        }
    };

    const handleLogout = () => {
        logout();
        setState({ MY: false });
        navigate('/');
    };

    const handleMenuSelect = (pageURL) => {
        navigate(pageURL, { replace: true });
    };

    const handleMenu = (event) => {
        setState({ MY: true });
    };

    return (
        <>
            <AppBar position="fixed" color="secondary">
                <Toolbar>
                    <Typography variant="h4" sx={{ flexGrow: 1 }}>
                        TMDB Client
                    </Typography>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        All you ever wanted to know about Movies!
                    </Typography>
                    {isMobile ? (
                        <>
                            <IconButton
                                aria-label="menu"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={state.MY}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(state.MY)}
                                onClose={() => setState({ MY: false })}
                            >
                                {menuOptions.map((opt) => (
                                    <MenuItem
                                        key={opt.label}
                                        onClick={() => handleMenuSelect(opt.path)}
                                    >
                                        {opt.label}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </>
                    ) : (
                        <>
                            {menuOptions.map((opt) => (
                                <Button
                                    key={opt.label}
                                    color="inherit"
                                    onClick={() => handleMenuSelect(opt.path)}
                                >
                                    {opt.label}
                                </Button>
                            ))}
                        </>
                    )}
                    <div>
                        {isLoggedIn ? (
                            <>
                                <IconButton onClick={() => setState({ MY: true })}>
                                    <Avatar src={user.photoURL || "/broken-image.jpg"}>
                                        {user.email.charAt(0)}
                                    </Avatar>
                                </IconButton>
                                <SwipeableDrawer
                                    anchor="right"
                                    open={state.MY}
                                    onClose={() => setState({ MY: false })}
                                    onOpen={() => setState({ MY: true })}
                                >
                                    <Box
                                        role="presentation"
                                        sx={{ width: 250 }}
                                    >
                                        <List>
                                            {myOptions.map((object, index) => (
                                                <ListItem key={object.label} disablePadding>
                                                    <ListItemButton to={object.path} component={Link}>
                                                        <ListItemIcon>
                                                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                                        </ListItemIcon>
                                                        <ListItemText primary={object.label} />
                                                    </ListItemButton>
                                                </ListItem>
                                            ))}
                                        </List>
                                        <Divider />
                                        <List>
                                            <ListItem disablePadding>
                                                <ListItemButton onClick={handleLogout}>
                                                    <ListItemIcon>
                                                        <ExitToAppIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Sign out" />
                                                </ListItemButton>
                                            </ListItem>
                                        </List>
                                    </Box>
                                </SwipeableDrawer>
                            </>
                        ) : (
                            <Button color="inherit" onClick={handleMyClick}>
                                Login
                            </Button>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
            <Offset />
        </>
    );
};

export default SiteHeader;
