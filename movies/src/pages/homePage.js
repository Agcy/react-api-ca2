import React, {useEffect, useState} from 'react';
import {useQueries, useQuery} from 'react-query';
import { getMovies, getMovieImages } from '../api/tmdb-api';
import PageTemplate from '../components/movie/templateMovieListPage';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import PaginationComponent from '../pagination/paginationTemplate';
import Header from "../components/movie/headerMovieList";
import Grid from "@mui/material/Grid";
import img from "../images/film-poster-placeholder.png";
import Box from "@mui/material/Box";

const HomePage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, error, isLoading, isError } = useQuery(
        ['discover', { page: currentPage }], getMovies
    );
    // 当电影数据可用时，发起图片查询
    const movieImageQueries = useQueries(
        data?.results?.slice(0, 6).map(movie => ({
            queryKey: ['movieImages', { id: movie.id }],
            queryFn: getMovieImages
        })) || []
    );

    // 检查图片是否正在加载或有错误
    const isImagesLoading = movieImageQueries.some(query => query.isLoading);
    const imagesError = movieImageQueries.find(query => query.isError)?.error;

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const movies = data.results;

    // 获取电影海报的URL数组
    const moviePosters = movieImageQueries.map(query =>
        query.data?.backdrops[0]?.file_path
    ).filter(path => path);

    const totalPages = Math.min(data.total_pages, 500);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };


    return (
        <Box sx={{
            background: 'linear-gradient(to right, #9b59b6, #e35b5a)'
        }}>
            <Grid item xs={12}>
                <Header title="Discover Movies" />
            </Grid>
            <PageTemplate
                movies={movies}
                images={moviePosters}
                action={(movie) => <AddToFavoritesIcon movie={movie} />}
            />
            <PaginationComponent
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </Box>
    );
};

export default HomePage;
