import {movies} from "../config/mongoCollections.js";
import {ObjectId} from "mongodb";

//export the following functions using ES6 syntax

const getMovieById = async (id) => {
  if (id==undefined) {throw new Error("id is undefined");}
  if (typeof id != "string") {throw new Error("id must be of type string");}
  id = id.trim();
  if (id.length <= 0) {throw new Error("id must be a non empty string");}
  if (!ObjectId.isValid(id)) {throw new Error("invalid object ID");}
  const movieCollection = await movies();
  let x = new ObjectId(id);
  const movie = await movieCollection.findOne({_id: x});
  if (movie == null) {throw new Error("no movie with that id");}
  movie._id = movie._id.toString();
  return movie;
};


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
  //is string and trim is a length of at least 2
  if (typeof title != 'string' || title.trim().length < 2) {throw new Error("title must be at least two characters");}
  if (!/^[A-Za-z0-9\s]*$/.test(title)) {throw new Error("title can contain letters a-z, A-Z or numbers");}
  //title is fine
  title = title.trim();

  //studio checks
  //is string and trim is a length of at least 5
  if (typeof studio != 'string' || studio.trim().length < 5) {throw new Error("studio must be at least 5 characters");}
  if (!/^[A-Za-z\s]*$/.test(studio)) {throw new Error("studio can contain letters a-z and A-Z");}
  //studio is fine
  studio = studio.trim();

  //director checks
  if (typeof director != 'string' || director.trim().length <= 0) {throw new Error("director must be a non empty string");}
  director = director.trim();
  let temp_director = director.split(" ");//sets director to a list
  //if length of director != 2 (for first and last name) OR first/last name are less than 3 characters throw error
  if (temp_director.length != 2 || temp_director[0].length < 3 || temp_director[1].length < 3) {throw new Error("director must have the following format \"first name space last name\" where first name and last name are at least 3 characters")}
  //now ensure there's only letters in both part
  if (!/^[A-Za-z\s]*$/.test(temp_director[0]) || !/^[A-Za-z\s]*$/.test(temp_director[1])) {throw new Error("first and last names must contain only letters a-z and A-Z");}
  
  //rating checks
  if (typeof rating != 'string' || rating.trim().length <= 0) {throw new Error("rating must be a non empty string");}
  rating = rating.trim();
  if ((rating != 'G') && (rating != "PG") && (rating != "PG-13") && (rating != "R") && (rating != "NC-17")) {throw new Error("rating is not a valid value");}

  //genres checks
  if (!Array.isArray(genres)) {throw new Error("genres must be of type array");}
  if (genres.length < 1) {throw new Error("genres must be an array with at least one element");}
  if (!genres.every(g => typeof g == "string")) {throw new Error("all items in genres must be of type string")}
  if (!genres.every(g => g.trim().length >= 5)) {throw new Error("all items in genres must be at least 5 characters long");}
  genres = genres.map(g => g.trim());
  if (!genres.every(g => /^[A-Za-z\s]*$/.test(g))) {throw new Error("all items in genres must only contain letters a-z or A-Z");}

  //castMembers checks
  if (!Array.isArray(castMembers)) {throw new Error("castMembers must be of type array");}
  if (castMembers.length < 1) {throw new Error("castMembers must be an array with at least one element");}
  if (!castMembers.every(cm => typeof cm == "string")) {throw new Error("all items in castMembers must be of type string")}
  if (!castMembers.every(cm => cm.trim().length > 0)) {throw new Error("all items in castMembers must not be empty");}
  castMembers = castMembers.map(cm => cm.trim());
  if (!castMembers.every(cm => /^[A-Za-z\s]*$/.test(cm))) {throw new Error("all items in castMembers must only contain letters a-z or A-Z");}
  let temp_cm = castMembers.map(cm => cm.split(" "));
  //check if every val in temp_cm is = length 2
  if (!temp_cm.every(val => val.length == 2)) {throw new Error("every castMember must have the following format \"first name space last name\"");}
  //check if all first and last names are at least 3 characters long
  if (!temp_cm.every(val => val[0].length >= 3 && val[1].length >= 3)) {throw new Error("every castMember must have a first and last name of at least 3 characters each");}
  
  //dateReleased checks
  if (typeof dateReleased != 'string' || dateReleased.trim().length <= 0) {throw new Error("dateReleased must be a non empty string");}
  dateReleased = dateReleased.trim();
  //check its format: mm/dd/yyyy"
  let regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
  if (!regex.test(dateReleased)) {throw new Error("dateReleased must be a valid date in the following format: mm/dd/yyyy");}
  //check if its a VALID date
  //apparently Date() automatically fixes incorrect dates so we gonna do this
  let origDates = dateReleased.split("/").map(Number);//convert month [0], day [1], year [2] to numbers
  let convertedDate = new Date(origDates[2], origDates[0]-1, origDates[1]);//convert them to Data structure
  
  if ((convertedDate.getDate()!=origDates[1]) || (convertedDate.getMonth()!=origDates[0]-1) || (convertedDate.getFullYear()!=origDates[2])) {throw new Error("dateReleased must be a valid date");}
  //check if date is between smallest and largest dates
  let smallestDate = new Date('01/01/1900');
  let largestDate = new Date();
  if ((convertedDate.getFullYear() < smallestDate.getFullYear()) || (convertedDate.getFullYear() > largestDate.getFullYear()+2)) {
    throw new Error(`Only years between 1900 and ${largestDate.getFullYear() + 2} are allowed`);
  }

  //runtime checks
  if (typeof runtime != 'string' || runtime.trim().length <= 0) {throw new Error("runtime must be a non empty string");}
  runtime = runtime.trim();
  regex = /^(0|[1-9]\d*)h (0|[1-5]?\d)min$/;
  if (!regex.test(runtime)) {throw new Error("runtime must be a valid value in the following format: #h #min");}
  let rTemp = runtime.split(" ");
  rTemp[0] = Number(rTemp[0].replace("h","")); rTemp[1] = Number(rTemp[1].replace("min",""));
  //final check: movie is at least 31 minutes
  if (rTemp[0]==0 && rTemp[1]<31) {throw new Error("runtime must be at least 31 minutes");}
  
  //leftover string checks 
  if (typeof plot != 'string' || plot.trim().length <= 0) {throw new Error("plot must be a non empty string");}
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
    runtime: runtime
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
  movieList = movieList.map((element) => {
    element._id = element._id.toString();
    return element;
  });
  return movieList;
};

const removeMovie = async (id) => {
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
    if (!deletionInfo) {throw new Error(`Could not delete movie with id of ${id}`);}
    return `${deletionInfo.title} has been successfully deleted!`;
};

const renameMovie = async (id, newName) => {
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

export {createMovie, getAllMovies, getMovieById, removeMovie, renameMovie};