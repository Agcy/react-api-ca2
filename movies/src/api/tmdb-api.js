import React, {useEffect} from "react";

export const login = async (account, password) => {
    const response = await fetch('http://localhost:8080/api/users', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ account: account, password: password })
    });
    return response.json();
};

export const signup = async (username, email, password) => {
    try {
        const response = await fetch('http://localhost:8080/api/users?action=register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();
        if (!response.ok) {
            // 返回一个包含错误状态和消息的对象
            return { error: true, status: response.status, message: data.msg || 'Registration failed' };
        }

        return data; // 成功时返回数据
    } catch (error) {
        // 处理网络错误或其他意外错误
        return { error: true, status: null, message: error.message || 'An unexpected error occurred' };
    }
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
    const [, idPart] = args.queryKey
    const {id} = idPart
    const response = await fetch(`http://localhost:8080/api/movies/tmdb/movie/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get',
    });
    return response.json();
};

export const getMovieImages = async (args) => {
    const [, idPart] = args.queryKey
    const {id} = idPart
    const response = await fetch(`http://localhost:8080/api/movies/tmdb/movie/${id}/image`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get',
    });
    return response.json();
};

export const getMovieCredits = async (args) => {
    const [, idPart] = args.queryKey
    const {id} = idPart
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
export const getActor = async (args) => {
    const [, idPart] = args.queryKey;
    const {id} = idPart;
    const response = await fetch(`http://localhost:8080/api/actors/tmdb/actor/${id}`, {
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
    const response = await fetch(`http://localhost:8080/api/actors/tmdb/actors?page=${page}&language=${language}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get',
    });
    return response.json();
};

// 演员海报
export const getActorImages = async (args) => {
    const [, idPart] = args.queryKey;
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
export const getActorMovieCredits = async (args) => {
    const [, idPart] = args.queryKey;
    const {id, language} = idPart;
    // const [, pageMode] = args.queryKey
    // const {language} = pageMode
    const response = await fetch(`http://localhost:8080/api/actors/tmdb/movie_credits/${id}?language=${language}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get',
    });
    return response.json();
};
