import React, {useContext} from "react";
import PageTemplate from "../components/movie/templateMovieListPage";
import {MoviesContext} from "../contexts/moviesContext";
import {useQueries} from "react-query";
import {getMovie} from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromPreviews from "../components/cardIcons/removeFromPreviews";
import Header from "../components/movie/headerMovieList";
import Grid from "@mui/material/Grid";
// import WriteReview from "../components/cardIcons/writeReview";

const MarkedMoviesPage = () => {
    const {previews: movieIds} = useContext(MoviesContext);

    // Create an array of queries and run in parallel.
    const previewMovieQueries = useQueries(
        movieIds.map((movieId) => {
            return {
                queryKey: ["movie", {id: movieId}],
                queryFn: getMovie,
            };
        })
    );
    // Check if any of the parallel queries is still loading.
    const isLoading = previewMovieQueries.find((m) => m.isLoading === true);

    if (isLoading) {
        return <Spinner/>;
    }

    const movies = previewMovieQueries.map((q) => {
        q.data.genre_ids = q.data.genres.map(g => g.id)
        return q.data
    });

    const toDo = () => true;

    return (
        <>
            <Grid item xs={12}>
                <Header title="Marked Movies"/>
            </Grid>
            <PageTemplate
                movies={movies}
                action={(movie) => {
                    return (
                        <RemoveFromPreviews movie={movie}/>
                    );
                }}
            />
        </>
    );
};

export default MarkedMoviesPage;
