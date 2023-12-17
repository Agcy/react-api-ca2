import React from "react";
import ActorCard from "../actorCard"; // 显示单个演员的ActorCard组件
import Grid from "@mui/material/Grid";

const ActorList = ({ actors, action }) => {
    let actorCards = actors.map((actor) => (
        <Grid key={actor.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <ActorCard key={actor.id} actor={actor} action={action} />
        </Grid>
    ));
    return <Grid container spacing={2}>{actorCards}</Grid>;
};

export default ActorList;
