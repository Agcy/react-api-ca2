import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import CarouselComponent from "../../carousel";

function MovieListPageTemplate({ movies, action, images, interval = 3000 }) {
    const [nameFilter, setNameFilter] = useState("");
    const [genreFilter, setGenreFilter] = useState("0");
    const [sortMethod, setSortMethod] = useState("");
    const genreId = Number(genreFilter);

    const handleUserInput = (type, value) => {
        if (type === "name") {
            setNameFilter(value);
        } else if (type === "genre") {
            setGenreFilter(value);
        } else if (type === "sort") {
            setSortMethod(value);
        }
    };

    // 排序电影数据
    let sortedMovies = [...movies];
    if (sortMethod === "rating_desc") {
        sortedMovies.sort((a, b) => b.vote_average - a.vote_average);
    } else if (sortMethod === "rating_asc") {
        sortedMovies.sort((a, b) => a.vote_average - b.vote_average);
    } else if (sortMethod === "release_date_desc") {
        sortedMovies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    } else if (sortMethod === "release_date_asc") {
        sortedMovies.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
    }

    let displayedMovies = sortedMovies
        .filter((m) => m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1)
        .filter((m) => genreId > 0 ? m.genre_ids.includes(genreId) : true);

    return (
        <Grid container sx={{ padding: '20px' }}>
            {images && images.length > 0 && (
                <Grid item xs={12}>
                    <CarouselComponent images={images} interval={interval}/>
                </Grid>
            )}
            <Grid item container spacing={5}>
                <Grid item xs={12}>
                    <FilterCard
                        titleFilter={nameFilter}
                        genreFilter={genreFilter}
                        onUserInput={handleUserInput} // 处理用户输入
                    />
                </Grid>
                <MovieList action={action} movies={displayedMovies}></MovieList>
            </Grid>
        </Grid>
    );
}

export default MovieListPageTemplate;
