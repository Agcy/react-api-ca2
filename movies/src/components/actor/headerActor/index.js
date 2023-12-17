import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const ActorHeader = ({ actor }) => {
    const navigate = useNavigate();

    return (
        <Paper
            component="div"
            sx={{
                display: "flex",
                justifyContent: "space-around",
                flexWrap: "wrap",
                padding: 1.5,
                margin: 0,
            }}
        >
            <IconButton aria-label="go back" onClick={() => navigate(-1)}>
                <ArrowBackIcon color="primary" fontSize="large" />
            </IconButton>

            <Typography variant="h4" component="h3">
                {actor.name}
                <br />
                {actor.gender}
                {/* 可以在这里添加更多演员的信息，如出生日期等 */}
                <span sx={{ fontSize: "1.5rem" }}>{actor.place_of_birth}</span>
            </Typography>

            <IconButton aria-label="go forward" onClick={() => navigate(+1)}>
                <ArrowForwardIcon color="primary" fontSize="large" />
            </IconButton>
        </Paper>
    );
};

export default ActorHeader;
