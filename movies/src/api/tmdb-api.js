import React, {useEffect} from "react";
import i18n from '../components/languageOptions/index'

export const getMovies = (args) => {
    const [, pageMode] = args.queryKey
    const {language, page} = pageMode
    return fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=${language}&include_adult=false&include_video=false&page=${page}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getMovie = (args) => {
    // console.log(args)
    const [, idPart] = args.queryKey;
    const {id} = idPart;
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getGenres = async (language) => {
    return fetch(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        process.env.REACT_APP_TMDB_KEY +
        "&language=" +
        language
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getMovieImages = ({queryKey}) => {
    const [, idPart] = queryKey;
    const {id} = idPart;
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();

    })
        .catch((error) => {
            throw error
        });
};

export const getMovieCredits = ({queryKey}) => {
  const [, idPart] = queryKey;
  const {id} = idPart;
    return fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();

    })
        .catch((error) => {
            throw error
        });
};

export const getMovieReviews = (id) => {
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
    )
        .then((res) => res.json())
        .then((json) => {
            // console.log(json.results);
            return json.results;
        });
};

export const getUpcomingMovie = (args) => {
    const [, pageMode] = args.queryKey
    const {language, page} = pageMode
    return fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=${language}&page=${page}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
}

export const getTrendingMovies = (args) => {
    const [, pageMode] = args.queryKey
    const {language, page} = pageMode
    return fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_TMDB_KEY}&language=${language}&page=${page}`
    ).then(response => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });

};

export const getActor = ({queryKey}) => {
    const [, {id}] = queryKey;
    return fetch(
        `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    });
};

export const getPopularActors = (args) => {
    const [, pageMode] = args.queryKey
    const {language, page} = pageMode
    return fetch(
        `https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=${language}&page=${page}`
    ).then(response => response.json());
};

export const getActorImages = ({queryKey}) => {
    const [, idPart] = queryKey;
    const {id} = idPart;
    return fetch(
        `https://api.themoviedb.org/3/person/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then(response => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch(error => {
            throw error;
        });
};

export const getActorMovieCredits = ({queryKey}, language) => {
    const [, idPart] = queryKey;
    const {id} = idPart;
    return fetch(
        `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=${language}`
    ).then(response => response.json());
};

export const getChangeLanguage = () => {
    return fetch(
        'https://api.themoviedb.org/3/configuration/language'
    )
}
