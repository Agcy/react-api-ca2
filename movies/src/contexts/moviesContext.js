import React, {useContext, useEffect, useState} from "react";
import {
  addFavorite,
  addMarkedMovie,
  addToReview,
  getUserFavorites, getUserMarkedMovies, getUserMovieReviews,
  removeFavorite,
  removeMarkedMovie
} from "../api/tmdb-api";
import {AuthContext} from "./mongoAuthContext";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [myReviews, setMyReviews] = useState( {} )
  const [previews, setPreviews] = useState( [] )
  const { user, isAuthenticated } = useContext(AuthContext);
  const [favorites, setFavorites] = useState( [] )

  useEffect(()=>{
    if(!isAuthenticated){
      setFavorites([])
      setPreviews([])
      setMyReviews([])
  }else {
      async function getRecord() {
        setFavorites(await getUserFavorites(user.id))
        setPreviews(await getUserMarkedMovies(user.id))
        setMyReviews(await getUserMovieReviews(user.id))
      }
      getRecord()
    }
  }, [isAuthenticated])

  const updateFavorites = async (userId) => {
    const favorites = await getUserFavorites(userId);
    setFavorites(favorites.map(f => f.movieId)); // 假设返回的是包含 movieId 的对象数组
  };

  const addToFavorites = async (movie) => {
    try {
      await addFavorite(user.id, movie.id); // 假设 userId 是当前登录用户的 ID
      setFavorites([...favorites, movie.id]); // 更新本地状态
    } catch (error) {
      console.error('Failed to add to favorites:', error);
    }
  };

  const addReview = async (movie, reviewData) => {
    try {
      const review = await addToReview(movie.id, user.id, reviewData);
      setMyReviews({ ...myReviews, [movie.id]: [...(myReviews[movie.id] || []), review] });
    } catch (error) {
      console.error('Error posting review:', error);
    }
  };
  //console.log(myReviews);

  // We will use this function in a later section
  // const removeFromFavorites = (movie) => {
  //   setFavorites( favorites.filter(
  //     (mId) => mId !== movie.id
  //   ) )
  // };

  const removeFromFavorites = async (movie) => {
    try {
      await removeFavorite(user.id, movie.id); // 假设 userId 是当前登录用户的 ID
      setFavorites(favorites.filter((mId) => mId !== movie.id)); // 更新本地状态
    } catch (error) {
      console.error('Failed to remove from favorites:', error);
    }
  };

  const addToPreviews = async (movie) => {
    try {
      const result = await addMarkedMovie(user.id, movie.id);
      setPreviews([...previews, movie.id]);
    } catch (error) {
      console.error('Error adding movie to previews:', error);
    }
  };

  const removeFromPreviews = async (movie) => {
    try {
      const result = await removeMarkedMovie(user.id, movie.id);
      setPreviews(previews.filter((mId) => mId !== movie.id));
    } catch (error) {
      console.error('Error removing movie from previews:', error);
    }
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        previews,
        addToFavorites,
        removeFromFavorites,
        addReview,
        addToPreviews,
        removeFromPreviews
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
