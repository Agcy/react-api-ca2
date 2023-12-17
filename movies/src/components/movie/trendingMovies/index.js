import React, { useState, useEffect } from 'react';
import { getTrendingMovies } from '../../../api/tmdb-api';

const TrendingMovies = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getTrendingMovies().then(moviesData => {
            setMovies(moviesData.results);
        });
    }, []);

    return (
        <div>
            {/* 展示电影列表 */}
            {movies.map(movie => (
                <div key={movie.id}>
                    {/* 电影信息展示 */}
                </div>
            ))}
        </div>
    );
};

export default TrendingMovies;
