import React, {useContext} from "react";
import PageTemplate from "../components/movie/templateMovieListPage";
import {MoviesContext} from "../contexts/moviesContext";
import {useQueries, useQuery} from "react-query";
import {getMovie, getUserFavorites} from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";
import Header from "../components/movie/headerMovieList";
import Grid from "@mui/material/Grid";
import {AuthContext} from "../contexts/mongoAuthContext";

const FavoriteMoviesPage = () => {
    const {favorites: movieIds} = useContext(MoviesContext);
    const { user } = useContext(AuthContext); // 获取当前登录的用户
    const { data: favoriteMovies, isLoading: isLoadingFavorites } =
        useQuery(['favorites', user.id], () => getUserFavorites(user.id));


    // Create an array of queries and run in parallel.
    const favoriteMovieQueries = useQueries(
        movieIds.map((movieId) => {
            return {
                queryKey: ["movie", {id: movieId}],
                queryFn: getMovie,
            };
        })
    );

    // 当正在加载时显示 Spinner
    if (isLoadingFavorites) {
        return <Spinner />;
    }
    // Check if any of the parallel queries is still loading.
    const isQueryLoading = favoriteMovieQueries.find((m) => m.isLoading === true);
    if (isQueryLoading) {
        return <Spinner />;
    }

    const movies = favoriteMovieQueries.map((q) => {
        q.data.genre_ids = q.data.genres.map(g => g.id)
        return q.data
    });

    const toDo = () => true;

    return (
        <>
            <Grid item xs={12}>
                <Header title="Favorite Movies"/>
            </Grid>
            <PageTemplate
                movies={movies}
                action={(movie) => {
                    return (
                        <>
                            <RemoveFromFavorites movie={movie}/>
                            <WriteReview movie={movie}/>
                        </>
                    );
                }}
            />
        </>
    );
};

export default FavoriteMoviesPage;
