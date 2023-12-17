import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { MoviesContext } from "../../../contexts/moviesContext";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import {CardActionArea} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import img from '../../../images/film-poster-placeholder.png';

export default function MiniMoviesCard({ movie, action }) {
    const { favorites, addToFavorites } = useContext(MoviesContext);
    const navigate = useNavigate();

    // ... 检查收藏状态的逻辑
    if (favorites.find((id) => id === movie.id)) {
        movie.favorite = true;
    } else {
        movie.favorite = false
    }

    const handleCardClick = () => {
        navigate(`/movies/${movie.id}`);
    };

    const handleAddToFavorite = (e) => {
        e.preventDefault();
        addToFavorites(movie);
    };

    return (
        <Card sx={{ maxWidth: 300, height: 400 }}> {/* 缩小了卡片尺寸 */}
            <CardActionArea onClick={handleCardClick}>
                <CardMedia
                    sx={{ height: 300 }} // 缩小了图片高度
                    image={
                        movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                            : img
                    }
                />
                <CardContent>
                    {/* ... 内容部分 */}
                </CardContent>
                <Typography variant="subtitle1" component="p" sx={{ textAlign: 'center', my: 1, maxHeight: 100 }}>
                    {movie.title}
                </Typography> {/* 将标题移至卡片底部 */}
            </CardActionArea>
        </Card>
    );
}
