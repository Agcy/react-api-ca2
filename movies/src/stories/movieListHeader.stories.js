import React from "react";
import MovieListHeader from "../components/movie/headerMovieList";

export default {
  title: "Home Page/Header",
  component: MovieListHeader,
};

export const Basic = () => {
    return <MovieListHeader title={'Discover Movies'} />;
};

Basic.storyName = "Default";
