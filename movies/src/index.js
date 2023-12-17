import React from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter, Route, Navigate, Routes} from "react-router-dom";
import HomePage from "./pages/homePage";
import {QueryClientProvider, QueryClient} from "react-query";
import {ReactQueryDevtools} from 'react-query/devtools';
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import MoviesContextProvider from "./contexts/moviesContext";
import SiteHeader from './components/siteHeader';
import AddMovieReviewPage from './pages/addMovieReviewPage';
import UpcomingMoviePage from './pages/upcomingMoviePage';
import MarkedMoviesPage from './pages/markedMoviesPage'
import TrendingMoviePage from "./pages/trendingMoviePage";
import ActorDetailsPage from "./pages/actorDetailsPage";
import ActorListPage from "./pages/actorListPage";
import {ActorsProvider} from "./contexts/actorsContext";
import FollowedActorsPage from "./pages/followedActorsPage";
import {AuthProvider} from "./contexts/authContext";
import LoginPage from "./pages/loginPage";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 360000,
            refetchInterval: 360000,
            refetchOnWindowFocus: false
        },
    },
});

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AuthProvider>
                    <SiteHeader/>
                    <MoviesContextProvider>
                        <ActorsProvider>
                            <Routes>
                                <Route path="/user/login" element={<LoginPage/>}/>
                                <Route path="/user/signup" element={<LoginPage type="signup"/>} />
                                <Route path="/movies/favorites" element={<FavoriteMoviesPage/>}/>
                                <Route path="/movies/marked" element={<MarkedMoviesPage/>}/>
                                <Route path="/movies/upcoming" element={<UpcomingMoviePage/>}/>
                                <Route path="/movies/trending" element={<TrendingMoviePage/>}/>
                                <Route path="/actors" element={<ActorListPage/>}/>
                                <Route path="/actors/followed" element={<FollowedActorsPage/>}/>
                                <Route path="/actors/:id" element={<ActorDetailsPage/>}/>
                                <Route path="/reviews/:id" element={<MovieReviewPage/>}/>
                                <Route path="/reviews/form" element={<AddMovieReviewPage/>}/>
                                <Route path="/movies/:id" element={<MoviePage/>}/>
                                <Route path="/" element={<HomePage/>}/>
                                <Route path="*" element={<Navigate to="/"/>}/>
                            </Routes>
                        </ActorsProvider>
                    </MoviesContextProvider>
                </AuthProvider>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    );
};

const rootElement = createRoot(document.getElementById("root"))
rootElement.render(<App/>);
