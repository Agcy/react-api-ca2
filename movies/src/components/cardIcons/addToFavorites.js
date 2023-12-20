import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../../contexts/mongoAuthContext"; // 引入 useNavigate

const AddToFavoritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const { isAuthenticated } = useContext(AuthContext); // 从 authContext 中获取用户的登录状态
  const navigate = useNavigate();

  const handleAddToFavorites = (e) => {
    e.preventDefault();
    // 检查用户是否登录
    if (isAuthenticated) {
      context.addToFavorites(movie);
    } else {
      // 如果用户未登录，重定向到登录页面
      navigate('/user/login');
    }
  };

  return (
      <IconButton aria-label="add to favorites" onClick={handleAddToFavorites}>
        <FavoriteIcon color="primary" fontSize="large" />
      </IconButton>
  );
};

export default AddToFavoritesIcon;
