import React, { useState } from "react";
import HeaderActorList from "../headerActorList";
import FilterActorsCard from "../filterActorsCard";
import ActorList from "../actorList";
import Grid from "@mui/material/Grid";
import CarouselComponent from "../../carousel";

function ActorListPageTemplate({ actors = [], title, action, images }) {
    const [nameFilter, setNameFilter] = useState("");
    const [sortKey, setSortKey] = useState("");
    const [genderFilter, setGenderFilter] = useState("");
    const handleChange = (type, value) => {
        if (type === "name") setNameFilter(value);
        if (type === "gender") setGenderFilter(value)
        if (type === "sort") setSortKey(value);
    };

    let displayedActors = actors.filter((a) => {
        return a.name.toLowerCase().search(nameFilter.toLowerCase()) !== -1 &&
            (genderFilter === "" || a.gender.toString() === genderFilter);
    });

    // 排序逻辑
    switch (sortKey) {
        case "popularity_desc":
            displayedActors.sort((a, b) => b.popularity - a.popularity);
            break;
        case "popularity_asc":
            displayedActors.sort((a, b) => a.popularity - b.popularity);
            break;
        case "name_asc":
            displayedActors.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case "name_desc":
            displayedActors.sort((a, b) => b.name.localeCompare(a.name));
            break;
        default:
            break;
    }

    return (
        <Grid container sx={{ padding: '20px' }}>
            {/* 轮播图片展示 */}
            {images && images.length > 0 && (
                <Grid item xs={12}>
                    <CarouselComponent images={images}/>
                </Grid>
            )}
            <Grid item container spacing={5}>
                <Grid key="find" item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <FilterActorsCard
                        onUserInput={handleChange}
                        nameFilter={nameFilter}
                    />
                </Grid>
                <ActorList action={action} actors={displayedActors} />
            </Grid>
        </Grid>
    );
}

export default ActorListPageTemplate;
