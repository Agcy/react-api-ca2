import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../../contexts/mongoAuthContext";

const AddToPreviewsIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const { isAuthenticated } = useContext(AuthContext); // 引入 authContext
  const navigate = useNavigate();

  const handleAddToPreviews = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      context.addToPreviews(movie);
    } else {
      navigate('/user/login'); // 如果未登录，则导航到登录页面
    }
  };

  return (
      <IconButton aria-label="add previews" onClick={handleAddToPreviews}>
        <PlaylistAddIcon color="primary" fontSize="large" />
      </IconButton>
  );
};

export default AddToPreviewsIcon;
