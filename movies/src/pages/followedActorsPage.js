import React, {useContext, useEffect, useState} from "react";
import {ActorsContext} from "../contexts/actorsContext";
import { AuthContext } from "../contexts/mongoAuthContext";
import PageTemplate from "../components/actor/templeteActorListPage";
import {useQueries, useQuery} from "react-query";
import {getActor, getUserFollowedActors} from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromFollowed from "../components/cardIcons/removeFromFollowed";
import Header from "../components/movie/headerMovieList";
import Grid from "@mui/material/Grid";

const FollowedActorsPage = () => {
    const { following: actorIds } = useContext(ActorsContext)
    const { user } = useContext(AuthContext);
    const { data: followedActors, isLoading: isLoadingFollowed } =
        useQuery(['followedActors', user.id], () => getUserFollowedActors(user.id));


    // Create an array of queries and run in parallel.
    const followedActorQueries = useQueries(
        actorIds?.map((actorId) => ({
            queryKey: ["actor", {id: actorId}],
            queryFn: getActor,
        })) || []
    );
    // Check if any of the parallel queries is still loading.
    const isQueryLoading = followedActorQueries.some((query) => query.isLoading);

    if (isLoadingFollowed || isQueryLoading) {
        return <Spinner />;
    }

    const actors = followedActorQueries
        .map((q) => q.data)
    console.log(actors)
    const toDo = () => true;

    return (
        <>
            <Grid item xs={12}>
                <Header title="Followed Actors"/>
            </Grid>
            <PageTemplate
                actors={actors}
                action={(actor) => (
                    <RemoveFromFollowed actor={actor}/>
                )}
            /></>
    );
};

export default FollowedActorsPage;
