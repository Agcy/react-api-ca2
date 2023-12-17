import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";

const RemoveFromPreviewsIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleRemoveFromPreviews = (e) => {
    e.preventDefault();
    context.removeFromPreviews(movie);
  };
  return (
    <IconButton
      aria-label="remove from previews"
      onClick={handleRemoveFromPreviews}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromPreviewsIcon;