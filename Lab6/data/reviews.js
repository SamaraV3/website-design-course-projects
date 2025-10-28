//Export the following functions using ES6 Syntax
import {movies} from "../config/mongoCollections.js";
import {ObjectId} from "mongodb";
import validation from "../helpers.js";
import movieFuncs from "./movies.js";
import {v4} from 'uuid';

const createReview = async (
  movieId,
  reviewTitle,
  reviewerName,
  review,
  rating
) => {
  //check review title
  validation.checkReviewTitle(reviewTitle);
  //check reviewerName
  validation.checkReviewerName(reviewerName);
  //check review
  validation.checkReview(review);
  //check rating
  validation.checkReviewRating(rating);
  //check movieId
  if (movieId==undefined) {throw new Error("id is undefined");}
  if (typeof movieId != "string") {throw new Error("id must be of type string");}
  movieId = movieId.trim();
  if (movieId.length <= 0) {throw new Error("id must be a non empty string");}
  if (!ObjectId.isValid(movieId)) {throw new Error("invalid object ID");}
  const movieCollection = await movies();
  let movie = await movieCollection.findOne({_id: new ObjectId(movieId)});
  if (movie == null) {throw new Error("no movie with that id");}

  //trim the strings
  reviewTitle = reviewTitle.trim();
  reviewerName = reviewerName.trim();
  review = review.trim();

  //make a reviewDate
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth()+1;
  let day = today.getDate();
  if (day<10) {day='0'+day;}//pad a zero
  if (month<10) {month='0'+month;}//pad a zero
  let reviewDate = month + '/' + day + '/' + year;

  //create review object
  let newReview = {
    _id: new ObjectId(),
    reviewTitle: reviewTitle,
    reviewDate: reviewDate,
    reviewerName: reviewerName,
    review: review,
    rating: rating
  };
  await movieCollection.updateOne(
    {_id: new ObjectId(movieId)},
    {$push: {reviews: newReview}}
  );
  //now update overall rating
  //first get new updated movie object
  movie = await movieCollection.findOne({_id: new ObjectId(movieId)});
  if (movie == null) {throw new Error("no movie with that id");}
  //now iterate over all movie.reviews to get sum
  let sumRating = 0;
  for (let i=0; i<movie.reviews.length; i++) {sumRating += movie.reviews[i].rating;}
  //and then get overall rating
  let overallRating = sumRating/movie.reviews.length;
  //and update item
  await movieCollection.updateOne(
    {_id : new ObjectId(movieId)},
    {$set : {overallRating : overallRating}}
  );
  
  return await getReview(newReview._id.toString());
};

const getAllReviews = async (movieId) => {
  const movie = await movieFuncs.getMovieById(movieId);
  return movie.reviews;
};

const getReview = async (reviewId) => {
  if (reviewId==undefined) {throw new Error("id is undefined");}
  if (typeof reviewId != "string") {throw new Error("id must be of type string");}
  reviewId = reviewId.trim();
  if (reviewId.length <= 0) {throw new Error("id must be a non empty string");}
  if (!ObjectId.isValid(reviewId)) {throw new Error("invalid object ID");}
  const movieCollection = await movies();
  const movie = await movieCollection.findOne({"reviews._id": new ObjectId(reviewId)});//find movie with that review
  if (movie == null) {throw new Error("no review with that id");}
  let review = movie.reviews.find((r) => r._id.toString() == reviewId);
  review._id = review._id.toString();
  return review;
};

const removeReview = async (reviewId) => {
  if (reviewId==undefined) {throw new Error("id is undefined");}
  if (typeof reviewId != "string") {throw new Error("id must be of type string");}
  reviewId = reviewId.trim();
  if (reviewId.length <= 0) {throw new Error("id must be a non empty string");}
  if (!ObjectId.isValid(reviewId)) {throw new Error("invalid object ID");}
  const movieCollection = await movies();
  let movie = await movieCollection.findOne({"reviews._id": new ObjectId(reviewId)});//find movie with that review
  if (movie == null) {throw new Error("no review with that id");}
  //now remove the review from the movie
  await movieCollection.updateOne(
    {_id: new ObjectId(movie._id)},
    {$pull : {reviews : {_id : new ObjectId(reviewId)}} }
  );
  //now update overall rating
  let movieId = movie._id;
  //first get new updated movie object
  movie = await movieCollection.findOne({_id: new ObjectId(movieId)});
  if (movie == null) {throw new Error("no review with that id");}
  //now iterate over all movie.reviews to get sum
  let sumRating = 0;
  for (let i=0; i<movie.reviews.length; i++) {sumRating += movie.reviews[i].rating;}
  //and update item
  if (movie.reviews.length < 1) {
    await movieCollection.updateOne(
      {_id : new ObjectId(movieId)},
      {$set : {overallRating : 0}}
    );
  }
  else {
    //and then get overall rating
    let overallRating = sumRating/movie.reviews.length;
    await movieCollection.updateOne(
      {_id : new ObjectId(movieId)},
      {$set : {overallRating : overallRating}}
    );
  }

  return await movieFuncs.getMovieById(movie._id.toString());
};

const module_exports = {createReview, getAllReviews, getReview, removeReview};

export default module_exports;
