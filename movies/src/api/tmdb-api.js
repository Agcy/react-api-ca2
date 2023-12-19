import React, {useEffect} from "react";

export const login = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });
    return response.json();
};

export const signup = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users?action=register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });
    return response.json();
};

// 获取所有电影
export const getMovies = async (args) => {
    const [, pageMode] = args.queryKey
    const {language, page} = pageMode
    const response = await fetch(`http://localhost:8080/api/movies/tmdb/home?page=${page}&language=${language}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get',
    });
    return response.json();
};

export const getGenres = async (language) => {
    const response = await fetch(`http://localhost:8080/api/movies/tmdb/genres`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get',
    });
    return response.json();
};

// 获取单个电影的详细信息
export const getMovie = async (args) => {
    const [, idNum] = args.queryKey
    const {id} = idNum
    const response = await fetch(`http://localhost:8080/api/movies/tmdb/movie/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get',
    });
    return response.json();
};

export const getMovieImages = async (args) => {
    const [, idNum] = args.queryKey
    const {id} = idNum
    const response = await fetch(`http://localhost:8080/api/movies/tmdb/movie/${id}/image`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get',
    });
    return response.json();
};

export const getMovieCredits = async (args) => {
    const [, idNum] = args.queryKey
    const {id} = idNum
    const response = await fetch(`http://localhost:8080/api/movies/tmdb/movie_credits/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get',
    });
    return response.json();
};

export const getMovieReviews = (queryKey) => {
    const [, idPart] = queryKey;
    const {id} = idPart;
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
    )
        .then((res) => res.json())
        .then((json) => {
            // console.log(json.results);
            return json.results;
        });
};

// 获取即将上映的电影
export const getUpcomingMovie = async (args) => {
    const [, pageMode] = args.queryKey
    const {language, page} = pageMode
    const response = await fetch(`http://localhost:8080/api/movies/tmdb/upcoming?page=${page}&language=${language}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get',
    });
    return response.json();
};

export const getTrendingMovies = async (args) => {
    const [, pageMode] = args.queryKey
    const {language, page} = pageMode
    const response = await fetch(`http://localhost:8080/api/movies/tmdb/trending?page=${page}&language=${language}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get',
    });
    return response.json();
};

// 获取单个演员的详细信息
export const getActor = async (queryKey) => {
    const [, idPart] = queryKey;
    const {id} = idPart;
    const response = await fetch(`http://localhost:8080/api/actors/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get',
    });
    return response.json();
};

// 获取流行演员
export const getPopularActors = async (args) => {
    const [, pageMode] = args.queryKey
    const {language, page} = pageMode
    const response = await fetch(`http://localhost:8080/api/actors/tmdb/popular?page=${page}&language=${language}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get',
    });
    return response.json();
};

// 演员海报
export const getActorImages = async (queryKey) => {
    const [, idPart] = queryKey;
    const {id} = idPart;
    const response = await fetch(`http://localhost:8080/api/actors/tmdb/images/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get',
    });
    return response.json();
};

// 演员相关电影
export const getActorMovieCredits = async (queryKey) => {
    const [, idPart] = queryKey;
    const {id} = idPart;
    const response = await fetch(`http://localhost:8080/api/actors/tmdb/movie_credits/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get',
    });
    return response.json();
};
