//Export the following functions using ES6 Syntax
import {movies} from "../config/mongoCollections.js";
import {ObjectId} from "mongodb";
import validation from "../helpers.js";

const createMovie = async (
  title,
  plot,
  genres,
  rating,
  studio,
  director,
  castMembers,
  dateReleased,
  runtime
) => {
  let args = [title, plot, genres, rating, studio, director, castMembers, dateReleased, runtime];
    //check 1: ensure all are defined
    if (!args.every(val => val != undefined)) {throw new Error("One or more arguments undefined");}
  
    //Now checks on arguments
  
    //title checks
    validation.checkTitle(title);
    //title is fine
    title = title.trim();
  
    //studio checks
    validation.checkStudio(studio);
    //studio is fine
    studio = studio.trim();
  
    //director checks
    validation.checkDirector(director);
    director = director.trim();

    //rating checks
    validation.checkRating(rating);
    rating = rating.trim();

    //genres checks
    validation.checkGenres(genres);
    genres = genres.map(g => g.trim());

    //castMembers checks
    validation.checkCastMembers(castMembers);
    castMembers = castMembers.map(cm => cm.trim());

    //dateReleased checks
    validation.checkDateReleased(dateReleased);
    dateReleased = dateReleased.trim();

    //runtime checks
    validation.checkRuntime(runtime);
    runtime = runtime.trim();

    //leftover string checks 
    validation.checkPlot(plot);
    plot = plot.trim();
  
    //below is making new movie entry
    let newMovie = {
      title: title,
      plot: plot,
      genres: genres,
      rating: rating,
      studio: studio,
      director: director,
      castMembers: castMembers,
      dateReleased: dateReleased,
      runtime: runtime,
      reviews: [],
      overallRating: 0
    };
    const movieCollection = await movies();
    const insertInfo = await movieCollection.insertOne(newMovie);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) {throw 'Could not add movie';}
    const newId = insertInfo.insertedId.toString();
    const movie = await getMovieById(newId);
    return movie;
};

const getAllMovies = async () => {
  const movieCollection = await movies();
    let movieList = await movieCollection.find({}).toArray();
    if (!movieList) {throw new Error("Could not get all movies");}
    /*movieList = movieList.map((element) => {
      element._id = element._id.toString();
      return element;
    });*/
    return movieList;
};

const getMovieById = async (movieId) => {
  if (movieId==undefined) {throw new Error("id is undefined");}
  if (typeof movieId != "string") {throw new Error("id must be of type string");}
  movieId = movieId.trim();
  if (movieId.length <= 0) {throw new Error("id must be a non empty string");}
  if (!ObjectId.isValid(movieId)) {throw new Error("invalid object ID");}
  const movieCollection = await movies();
  let x = new ObjectId(movieId);
  const movie = await movieCollection.findOne({_id: x});
  if (movie == null) {throw new Error("no movie with that id");}
  movie._id = movie._id.toString();
  return movie;
};

const removeMovie = async (movieId) => {
  let id=movieId;
  if (!id) throw new Error('You must provide an id to search for');
      if (typeof id !== 'string') throw new Error('Id must be a string');
      if (id.trim().length === 0)
        throw new Error('id cannot be an empty string or just spaces');
      id = id.trim();
      if (!ObjectId.isValid(id)) throw 'invalid object ID';
      const movieCollection = await movies();
      const deletionInfo = await movieCollection.findOneAndDelete({
        _id: new ObjectId(id)
      });
      if (!deletionInfo) {throw new Error(`no movie with that id`);}
      return `${deletionInfo.title} has been successfully deleted!`;
};

const updateMovie = async (
  movieId,
  title,
  plot,
  genres,
  rating,
  studio,
  director,
  castMembers,
  dateReleased,
  runtime
) => {
  let args = [title, plot, genres, rating, studio, director, castMembers, dateReleased, runtime];
  //check 1: ensure all are defined
  if (!args.every(val => val != undefined)) {throw new Error("One or more arguments undefined");}

  //Now checks on arguments

  //title checks
  validation.checkTitle(title);
  //title is fine
  title = title.trim();

  //studio checks
  validation.checkStudio(studio);
  //studio is fine
  studio = studio.trim();

  //director checks
  validation.checkDirector(director);
  director = director.trim();

  //rating checks
  validation.checkRating(rating);
  rating = rating.trim();

  //genres checks
  validation.checkGenres(genres);
  genres = genres.map(g => g.trim());

  //castMembers checks
  validation.checkCastMembers(castMembers);
  castMembers = castMembers.map(cm => cm.trim());

  //dateReleased checks
  validation.checkDateReleased(dateReleased);
  dateReleased = dateReleased.trim();

  //runtime checks
  validation.checkRuntime(runtime);
  runtime = runtime.trim();

  //leftover string checks 
  validation.checkPlot(plot);
  plot = plot.trim();

  //now check movieId
  if (movieId==undefined) {throw new Error("id is undefined");}
  if (typeof movieId != "string") {throw new Error("id must be of type string");}
  movieId = movieId.trim();
  if (movieId.length <= 0) {throw new Error("id must be a non empty string");}
  if (!ObjectId.isValid(movieId)) {throw new Error("invalid object ID");}
  
  const movieCollection = await movies();
  //let x = new ObjectId(movieId);
  await getMovieById(movieId);//done so i can check if a movie with that id exists
  await movieCollection.updateOne(
    {_id: new ObjectId(movieId)},
    {$set: {
      title: title,
      plot: plot,
      genres: genres,
      rating: rating,
      studio: studio,
      director: director,
      castMembers: castMembers,
      dateReleased: dateReleased,
      runtime: runtime
    }
    }
  );
  return await getMovieById(movieId);
};

const renameMovie = async (id, newName) => {
  //Not used for this lab
  if (!id) {throw new Error("You must provide an id to search for");}
    if (typeof id != 'string') {throw new Error("Id must be a string");}
    if (id.trim().length == 0) {throw new Error("Id cannot be an empty string or just spaces");}
    id = id.trim();
    if (!newName) {throw new Error("You must provide a new name");}
    if (typeof newName != 'string') {throw new Error("newName must be a string");}
    if (newName.trim().length < 2 ) {throw new Error("newName cannot be an empty string or less than 2 characters");}
    newName = newName.trim();
    if (!/^[A-Za-z0-9\s]*$/.test(newName)) {throw new Error("newName can contain letters a-z, A-Z or numbers");}
    if (!ObjectId.isValid(id)) {throw new Error("invalid object ID");}
    const updatedMovie = {title: newName};
    const movieCollection = await movies();
    const origMovie = await getMovieById(id);
    //compare origMovie title to newName
    if (origMovie.title == newName) {throw new Error("newName is the same as the current name");}
    const updatedInfo = await movieCollection.findOneAndUpdate(
      {_id: new ObjectId(id)},
      {$set: updatedMovie},
      {returnDocument: 'after'}
    );
    if (!updatedInfo) {throw new Error("Could not update movie successfully");}
    updatedInfo._id = updatedInfo._id.toString();
    return updatedInfo;
};


const module_exports = {createMovie, getAllMovies, getMovieById, removeMovie, updateMovie, renameMovie};
export default module_exports;