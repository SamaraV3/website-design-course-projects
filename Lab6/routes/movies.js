//require express and express router as shown in lecture code
import {Router} from 'express';
const router = Router();
import {movies} from "../config/mongoCollections.js";
import {movieData} from '../data/index.js';
import validation from '../helpers.js';

router
  .route('/')
  .get(async (req, res) => {
    //code here for GET
    try {
      const movieCollection = await movies();
      let movieList = await movieCollection
      .find({})
      .project({_id: 1, title: 1})
      .toArray();
      return res.json(movieList);
    }
    catch (e) {
      return res.status(500).send(e);
    }
  })
  .post(async (req, res) => {
    //code here for POST
    const movieReqBody = req.body;
    //make sure theres smthn in the req body
    if (!movieReqBody|| Object.keys(movieReqBody).length === 0) {
      return res.status(400).json({error: 'There are no fields in the request body'});
    }
    try {
      const {title, plot, genres, rating, studio, director, castMembers, dateReleased, runtime} = movieReqBody;
      const newMovie = await movieData.createMovie(title, plot, genres, rating, studio, director, castMembers, dateReleased, runtime);
      return res.status(200).json(newMovie);
    } catch (e) {return res.status(400).send({error: e.toString()});}
  });

router
  .route('/:movieId')
  .get(async (req, res) => {
    //code here for GET
    try {
      const movie = await movieData.getMovieById(req.params.movieId.toString());
      return res.status(200).json(movie);

    } catch (e) {
      //check error
      if (e.toString()=="Error: no movie with that id") {return res.status(404).json({error: e.toString()});}
      else {return res.status(400).json({error: e.toString()});}
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    try {
      let deletedMovie = await movieData.removeMovie(req.params.movieId.toString());
      return res.status(200).json({"movieId": req.params.movieId.toString(), "deleted": true});
    } catch (e) {
      if (e.toString()=="Error: no movie with that id") {return res.status(404).json({error: e.toString()});}
      else {return res.status(400).json({error: e.toString()});}
    }
  })
  .put(async (req, res) => {
    //code here for PUT
    const movieReqBody = req.body;
    //make sure theres smthn in the req body
    if (!movieReqBody|| Object.keys(movieReqBody).length != 9) {
      return res.status(400).json({error: 'There are no fields in the request body'});
    }
    try {
      const {title, plot, genres, rating, studio, director, castMembers, dateReleased, runtime} = movieReqBody;
      const updatedMovie = await movieData.updateMovie(req.params.movieId.toString(), title, plot, genres, rating, studio, director, castMembers, dateReleased, runtime);
      return res.status(200).json(updatedMovie);
    } catch (e) {
      if (e.toString()=="Error: no movie with that id") {return res.status(404).send({error: e.toString()});}
      else {return res.status(400).send({error: e.toString()});}
    }
  });

export default router;