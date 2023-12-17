import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] )
  const [myReviews, setMyReviews] = useState( {} ) 
  const [previews, setPreviews] = useState( [] )

  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)){
      newFavorites = [...favorites, movie.id];
    }
    else{
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites)
  };

  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };
  //console.log(myReviews);
  
  // We will use this function in a later section
  const removeFromFavorites = (movie) => {
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
    ) )
  };

  const addToPreviews = (movie) => {
    let newMovies = [];
    if (!previews.includes(movie.id)){
      newMovies = [...previews, movie.id];
    }
    else{
      newMovies = [...previews];
    }
    setPreviews(newMovies)
  }

  const removeFromPreviews = (movie) => {
    setPreviews( previews.filter(
      (mId) => mId !== movie.id
    ))
  }

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