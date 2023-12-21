import Review from './reviewModel'
import express from 'express';
import asyncHandler from "express-async-handler";
import jwt from 'jsonwebtoken';

const router = express.Router(); // eslint-disable-line

router.get('/tmdb/user/:userId', asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const reviews = await Review.find({ userId }).populate('movieId', 'title');

    if (reviews.length > 0) {
        res.status(200).json(reviews);
    } else {
        res.status(404).json({ message: `No reviews found for user ${userId}` });
    }
}));

router.get('/tmdb/all', async (req, res) => {
    const reviews = await Review.find().populate('movieId', 'title');
    if (reviews) {
        res.status(200).json(reviews);
    } else {
        res.status(404).json({ message: 'No reviews found' });
    }
});


router.post('/tmdb/:movieId', asyncHandler(async (req, res) => {
    const { movieId } = req.params;
    const { userId, author, review, rating } = req.body;
    console.info(userId, author, review, rating);

    const reviewData = await Review.create({ movieId, userId, author, review, rating }).catch(err => null);

    if (reviewData) {
        console.info("add success");
        res.status(201).json(reviewData);
    } else {
        res.status(500).json({ message: 'Internal server error' });
    }
}));


export default router;

