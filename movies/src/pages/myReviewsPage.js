import React, { useEffect, useState, useContext } from "react";
import { getUserMovieReviews, deleteReview } from "../api/tmdb-api";
import { AuthContext } from "../contexts/mongoAuthContext";
import { Typography, Paper, List, ListItem, ListItemText, Divider, Button } from "@mui/material";

const MyReviewsPage = () => {
    const [reviews, setReviews] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            getUserMovieReviews(user.id).then(data => {
                setReviews(data.reviews); // 提取 reviews 数组
                console.log(data.reviews); // 打印以确认数据结构
            });
        }
    }, [user]);

    const handleDeleteReview = async (reviewId) => {
        try {
            await deleteReview(reviewId);
            setReviews(reviews.filter(review => review._id !== reviewId));
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    return (
        <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
            <Typography variant="h4" component="h1">My Reviews</Typography>
            <List>
                {Array.isArray(reviews) && reviews.map(review => (
                    <React.Fragment key={review._id}>
                        <ListItem alignItems="flex-start">
                            <ListItemText
                                primary={`Movie ID: ${review.movieId}`}
                                secondary={
                                    <>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {review.review}
                                        </Typography>
                                        {" — Rating: " + review.rating}
                                    </>
                                }
                            />
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => handleDeleteReview(review._id)}
                            >
                                Delete
                            </Button>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </React.Fragment>
                ))}
            </List>
        </Paper>
    );
};

export default MyReviewsPage;
