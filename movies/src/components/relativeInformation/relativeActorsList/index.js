import React from "react";
import MiniActorsCard from "../miniActorCard"; // 使用您的缩小版电影卡片组件
import Grid from "@mui/material/Grid";

const RelativeActorsList = ({ actors, action }) => {
    let miniActorsCards = actors.map((actor) => (
        <Grid key={actor.id} item xs={6} sm={4} md={3} lg={2} xl={1}>
            <MiniActorsCard key={actor.id} actor={actor} action={action} />
        </Grid>
    ));
    return <Grid container spacing={2}>{miniActorsCards}</Grid>;
};

export default RelativeActorsList;
