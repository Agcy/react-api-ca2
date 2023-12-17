import React, { useState } from "react";
import { useQueries, useQuery } from 'react-query';
import { getUpcomingMovie, getMovieImages } from "../api/tmdb-api";
import PageTemplate from '../components/movie/templateMovieListPage'
import AddToPreviewsIcon from '../components/cardIcons/addToPreviews'
import Spinner from '../components/spinner';
import PaginationComponent from "../pagination/paginationTemplate";
import Header from "../components/movie/headerMovieList";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const UpcomingMoviePage = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data: moviesData, error, isLoading, isError } = useQuery(
        ['upcoming', { page: currentPage }], getUpcomingMovie
    );

    // 当电影数据可用时，发起图片查询
    const movieImageQueries = useQueries(
        moviesData?.results?.slice(0, 6).map(movie => ({
            queryKey: ['movieImages', { id: movie.id }],
            queryFn: getMovieImages
        })) || []
    );

    // 检查图片是否正在加载或有错误
    const isImagesLoading = movieImageQueries.some(query => query.isLoading);
    const imagesError = movieImageQueries.find(query => query.isError)?.error;

    if (isLoading || isImagesLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    if (imagesError) {
        return <h1>{imagesError.message}</h1>;
    }

    const movies = moviesData.results;
    const moviePosters = movieImageQueries.map(query =>
        query.data?.backdrops[0]?.file_path
    ).filter(path => path);

    const totalPages = Math.min(moviesData.total_pages, 500);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <Box sx={{
            background: 'linear-gradient(to right, #8e44ad, #3498db)'
        }}>
            <Grid item xs={12}>
                <Header title='Upcoming Movies' />
            </Grid>
            <PageTemplate
                movies={movies}
                images={moviePosters}
                action={(movie) => <AddToPreviewsIcon movie={movie} />}
            />
            <PaginationComponent
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </Box>
    );
};

export default UpcomingMoviePage;
