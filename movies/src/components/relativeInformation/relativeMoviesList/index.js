import React from "react";
import MiniMoviesCard from "../miniMoviesCard"; // 使用您的缩小版电影卡片组件
import Grid from "@mui/material/Grid";

const RelativeMoviesList = ({ movies, action }) => {

    if (!movies) return null; // 添加这个检查以确保 movies 是已定义的

    let miniMoviesCards = movies.map((movie) => (
        <Grid key={movie.id} item xs={6} sm={4} md={3} lg={2} xl={1}>
            <MiniMoviesCard key={movie.id} movie={movie} action={action} />
        </Grid>
    ));
    return <Grid container spacing={2}>{miniMoviesCards}</Grid>;
};

export default RelativeMoviesList;
