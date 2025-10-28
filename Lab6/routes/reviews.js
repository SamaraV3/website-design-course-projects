//require express and express router as shown in lecture code
import {Router} from 'express';
const router = Router();
import {movies} from "../config/mongoCollections.js";
import {movieData, reviewData} from '../data/index.js';
import validation from '../helpers.js';

router
  .route('/:movieId')
  .get(async (req, res) => {
    //code here for GET
    try {
      const reviews = await reviewData.getAllReviews(req.params.movieId.toString());
      if (reviews.length==0) {return res.status(404).json({error: "no reviews"}); }
      return res.status(200).json(reviews);

    } catch (e) {
      //check error
      if (e.toString()=="Error: no movie with that id") {return res.status(404).json({error: e.toString()});}
      else {return res.status(400).json({error: e.toString()});}
    }
  })
  .post(async (req, res) => {
    //code here for POST
    const reviewReqBody = req.body;
    //make sure theres smthn in the req body
    if (!reviewReqBody || Object.keys(reviewReqBody).length != 4) {
      return res.status(400).json({error: 'There are no fields in the request body'});
    }
    try {//movieId = req.params.movieId.toString()
      const {reviewTitle, reviewerName, review, rating} = reviewReqBody;
      const newReview = await reviewData.createReview(req.params.movieId.toString(), reviewTitle, reviewerName, review, rating);
      return res.status(200).json(await movieData.getMovieById(req.params.movieId.toString()));
    } catch (e) {
      if (e.toString()=="Error: no movie with that id") {return res.status(404).json({error: e.toString()});}
      else {return res.status(400).json({error: e.toString()});}
    }
  });

router
  .route('/review/:reviewId')
  .get(async (req, res) => {
    //code here for GET
    try {
      const review = await reviewData.getReview(req.params.reviewId.toString());
      return res.status(200).json(review);
    }
    catch (e) {
      if (e.toString()=="Error: no review with that id") {return res.status(404).json({error: e.toString()});}
      else {return res.status(400).json({error: e.toString()});}
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    try {
      let deletedReview = await reviewData.removeReview(req.params.reviewId.toString());
      return res.status(200).json(deletedReview);
    } catch (e) {
      if (e.toString()=="Error: no review with that id") {return res.status(404).json({error: e.toString()});}
      else {return res.status(400).json({error: e.toString()});}
    }
  });

export default router;