import React, {useContext, useState} from "react";
import {addFavorite, addMarkedMovie, addToReview, removeFavorite, removeMarkedMovie} from "../api/tmdb-api";
import {AuthContext} from "./mongoAuthContext";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] )
  const [myReviews, setMyReviews] = useState( {} )
  const [previews, setPreviews] = useState( [] )
  const { user } = useContext(AuthContext);

  // const addToFavorites = (movie) => {
  //   let newFavorites = [];
  //   if (!favorites.includes(movie.id)){
  //     newFavorites = [...favorites, movie.id];
  //   }
  //   else{
  //     newFavorites = [...favorites];
  //   }
  //   setFavorites(newFavorites)
  // };

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
