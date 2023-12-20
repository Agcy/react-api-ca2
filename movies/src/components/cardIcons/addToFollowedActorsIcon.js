import React, { useContext, useState } from "react";
import { ActorsContext } from "../../contexts/actorsContext";
import { AuthContext } from "../../contexts/mongoAuthContext";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const AddToFollowedActorsIcon = ({ actor }) => {
    const context = useContext(ActorsContext);
    const { isAuthenticated } = useContext(AuthContext); // 引入 authContext
    const navigate = useNavigate();

    const [isFollowing, setIsFollowing] = useState(false);

    const handleClick = () => {
        if (isAuthenticated) {
            setIsFollowing(!isFollowing); // 切换激活状态
            context.addToFollowing(actor);
        } else {
            navigate('/user/login'); // 如果未登录，则导航到登录页面
        }
    };

    return (
        <IconButton aria-label="add to followed actors" onClick={handleClick}>
            <Button variant="outlined"
                    sx={{
                        color: isFollowing ? 'red' : 'default',
                        borderColor: isFollowing ? 'red' : 'default'
                    }}>
                Follow
            </Button>
        </IconButton>
    );
};

export default AddToFollowedActorsIcon;
