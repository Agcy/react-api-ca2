import React, { useEffect, useState } from "react";
import { getAllMovieReviews } from "../../../api/tmdb-api";
import { Card, CardContent, Typography, Divider, Box, Rating } from "@mui/material";

export default function RecordReviews({ movie }) {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        getAllMovieReviews().then((allReviews) => {
            setReviews(allReviews);
        });
    }, [movie.id]); // 依赖于 movie.id，当电影更改时重新加载评论

    return (
        <Box sx={{ margin: 2 }}>
            <p>Reviews</p>
            {reviews.filter(review => review.movieId === movie.id).map(filteredReview => (
                <Card key={filteredReview._id} sx={{ marginBottom: 2 }}>
                    <CardContent>
                        <Typography variant="h6">{filteredReview.author}</Typography>
                        <Rating value={filteredReview.rating} readOnly />
                        <Typography variant="body1">{filteredReview.review}</Typography>
                    </CardContent>
                    <Divider />
                </Card>
            ))}
        </Box>
    );
}
