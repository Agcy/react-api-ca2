import React, {useContext} from "react";
import {ActorsContext} from "../contexts/actorsContext";
import PageTemplate from "../components/actor/templeteActorListPage";
import {useQueries} from "react-query";
import {getActor} from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromFollowed from "../components/cardIcons/removeFromFollowed";
import Header from "../components/movie/headerMovieList";
import Grid from "@mui/material/Grid";

const FollowedActorsPage = () => {
    const {following: actorIds} = useContext(ActorsContext);

    // Create an array of queries and run in parallel.
    const followActorQueries = useQueries(
        actorIds.map((actorId) => {
            return {
                queryKey: ["actor", {id: actorId}],
                queryFn: getActor,
            };
        })
    );
    // Check if any of the parallel queries is still loading.
    const isLoading = followActorQueries.find((m) => m.isLoading === true);

    if (isLoading) {
        return <Spinner/>;
    }

    const actors = followActorQueries
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
