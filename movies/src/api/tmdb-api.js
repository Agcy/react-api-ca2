import React, {useEffect} from "react";

export const login = async (account, password) => {
    try {
        const response = await fetch('http://localhost:8080/api/users', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({ account: account, password: password })
        });

        const data = await response.json();
        if (!response.ok) {
            // 返回一个包含错误状态和消息的对象
            return { error: true, status: response.status, message: data.msg || 'Login failed' };
        }

        return data; // 成功时返回数据
    } catch (error) {
        // 处理网络错误或其他意外错误
        return { error: true, message: error.message || 'An unexpected error occurred' };
    }
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

export const getMovieReviews = async (id) => {
    // const [, idPart] = args.queryKey;
    // const {id} = idPart;
    const response = await fetch(`http://localhost:8080/api/movies/tmdb/movie/${id}/review`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get',
    });
    return response.json();
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
    const response = await fetch(`http://localhost:8080/api/actors/tmdb/movie_credits/${id}?language=${language}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get',
    });
    return response.json();
};


// 喜欢的电影
export const getUserFavorites = async (args) => {
    const [, idPart] = args.queryKey;
    const {id} = idPart;
    const response = await fetch(`http://localhost:8080/api/users/${id}/favorites`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok.');
    }
    return response.json();
};

// 添加
export const addFavorite = async (userId, movieId) => {
    try {
        const response = await fetch(`http://localhost:8080/api/users/${userId}/favorites`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ movieId: movieId })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error) {
        console.error('Error adding favorite:', error);
        throw error;
    }
};

//删除
export const removeFavorite = async (userId, movieId) => {
    try {
        const response = await fetch(`http://localhost:8080/api/users/${userId}/favorites/${movieId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error) {
        console.error('Error removing favorite:', error);
        throw error;
    }
};

export const getUserMarkedMovies = async (userId) => {
    const response = await fetch(`http://localhost:8080/api/users/${userId}/marked`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok.');
    }
    return response.json();
};

export const addMarkedMovie = async (userId, movieId) => {
    const response = await fetch(`http://localhost:8080/api/users/${userId}/marked`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ movieId: movieId })
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const removeMarkedMovie = async (userId, movieId) => {
    const response = await fetch(`http://localhost:8080/api/users/${userId}/marked/${movieId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const getUserFollowedActors = async (userId) => {
    const response = await fetch(`http://localhost:8080/api/users/${userId}/follow`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok.');
    }
    return response.json();
};

export const followActor = async (userId, actorId) => {
    const response = await fetch(`http://localhost:8080/api/users/${userId}/follow`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ actorId: actorId })
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const unfollowActor = async (userId, actorId) => {
    const response = await fetch(`http://localhost:8080/api/users/${userId}/follow/${actorId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

// reviews
export const getAllMovieReviews = async (movieId) => {
    const response = await fetch(`http://localhost:8080/api/tmdb/${movieId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch reviews');
    }
    return response.json();
};

export const getUserMovieReviews = async (userId) => {
    const response = await fetch(`http://localhost:8080/api/reviews/tmdb/user/${userId}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch movie reviews for user ${userId}`);
    }
    return response.json();
};


export const addToReview = async (movieId, userId, review) => {
    const response = await fetch(`http://localhost:8080/api/reviews/tmdb/${movieId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, ...review }) // reviewData 包含 author, content 和 rating
    });

    if (!response.ok) {
        throw new Error('Failed to post review');
    }
    return response.json();
};


