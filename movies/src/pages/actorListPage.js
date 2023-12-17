import React, { useState } from "react";
import { getPopularActors, getActorImages } from "../api/tmdb-api";
import ActorListPageTemplate from '../components/actor/templeteActorListPage';
import AddToFollowedActorsIcon from "../components/cardIcons/addToFollowedActorsIcon";
import { useQueries, useQuery } from 'react-query';
import Spinner from '../components/spinner';
import PaginationComponent from "../pagination/paginationTemplate";
import Box from "@mui/material/Box";
import HeaderActorList from "../components/actor/headerActorList";
import Grid from "@mui/material/Grid";

const ActorListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data: actorsData, error, isLoading, isError } = useQuery(
        ['actor', { page: currentPage }], getPopularActors
    );

    // 当演员数据可用时，发起图片查询
    const actorImageQueries = useQueries(
        actorsData?.results?.slice(0, 6).map(actor => ({
            queryKey: ['actorImages', { id: actor.id }],
            queryFn: getActorImages
        })) || []
    );

    // 检查图片是否正在加载或有错误
    const isImagesLoading = actorImageQueries.some(query => query.isLoading);
    const imagesError = actorImageQueries.find(query => query.isError)?.error;

    if (isLoading || isImagesLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    if (imagesError) {
        return <h1>{imagesError.message}</h1>;
    }

    const actors = actorsData.results;
    const actorPosters = actorImageQueries.map(query =>
        query.data?.profiles[0]?.file_path
    ).filter(path => path);

    const totalPages = Math.min(actorsData.total_pages, 500);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <Box sx={{
            background: 'linear-gradient(to bottom, #9b59b6, #34495e)'
        }}>
            <Grid item xs={12}>
                <HeaderActorList title='Popular Actors' />
            </Grid>
            <ActorListPageTemplate
                actors={actors}
                images={actorPosters}
                action={(actor) => <AddToFollowedActorsIcon actor={actor} />}
            />
            <PaginationComponent
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </Box>
    );
};

export default ActorListPage;
