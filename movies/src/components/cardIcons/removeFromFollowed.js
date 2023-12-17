import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { ActorsContext } from "../../contexts/actorsContext";
import Button from "@mui/material/Button";

const RemoveFromFollowedIcon = ({ actor }) => {
    const context = useContext(ActorsContext);

    const handleRemoveFromFollowed = (e) => {
        e.preventDefault();
        context.removeFromFollowed(actor);
    };
    return (
        <IconButton
            aria-label="remove from favorites"
            onClick={handleRemoveFromFollowed}
        >
            <Button variant="outlined" color="error">
                unfollow
            </Button>
        </IconButton>
    );
};

export default RemoveFromFollowedIcon;
