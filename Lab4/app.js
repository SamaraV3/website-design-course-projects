/*

1. Create a Movie of your choice.
2. Log the newly created Movie. (Just that movie, not all movies)
3. Create another movie of your choice.
4. Query all movies, and log them all
5. Create the 3rd movie of your choice.
6. Log the newly created 3rd movie. (Just that movie, not all movies)
7. Rename the first movie
8. Log the first movie with the updated name. 
9. Remove the second movie you created.
10. Query all movies, and log them all
11. Try to create a movie with bad input parameters to make sure it throws errors.
12. Try to remove a movie that does not exist to make sure it throws errors.
13. Try to rename a movie that does not exist to make sure it throws errors.
14. Try to rename a movie passing in invalid data for the newName parameter to make sure it throws errors.
15. Try getting a movie by ID that does not exist to make sure it throws errors.

*/
import {createMovie, getAllMovies, getMovieById, removeMovie, renameMovie} from "./data/movies.js";
import {dbConnection, closeConnection} from './config/mongoConnection.js';

async function main() {
    const db = await dbConnection();
    await db.dropDatabase();
    let dps = undefined;
    let outsiders = undefined;
    let httyd = undefined;
    let all_movies = undefined;
    //1. Create a Movie of your choice.
    try {
    dps = await createMovie("Dead Poets Society", `Maverick teacher John Keating returns in 1959 to the prestigious New England boys' 
        boarding school where he was once a star student, using poetry to embolden his pupils to new heights of self-expression.`,
    ["Coming of Age", "Melodrama"], "PG-13", "Touchstone Pictures", "Peter Weir",
    ["Robin Williams", "Robert SeanLeonard", "Ethan Hawke", "Gale Hansen", "Josh Charles", "Dylan Kussman", "Allelon Ruggiero",
    "James Waterson"], "06/02/1989", "2h 8min");
    } catch (e) {console.log(e);}
    //2. Log the newly created Movie. (Just that movie, not all movies)
    try {
        console.log(dps);
    } catch (e) {console.log(e);}
    //3. Create another movie of your choice.
    try {
    outsiders = await createMovie("The Outsiders", `In a small Oklahoma town in 1964, the rivalry between two gangs, the 
        poor Greasers and the rich Socs, heats up when one gang member accidentally kills a member of the other.`, 
        ["Coming of Age", "Action", "  Crime   "],
        "PG-13", "Zoetrope Studios", "Francis FordCoppola", 
        ["Matt Dillon", "Ralph Macchio", "Christopher ThomasHowell", "Patrick Swayze", "Rob Lowe", "Tom Cruise", "Emilio Estevez"],
        "03/25/1983", "1h 54min   "
    );
    } catch (e) {console.log(e);}
    //4. Query all movies, and log them all
    try {
        all_movies = await getAllMovies();
        console.log(all_movies);
    } catch (e) {console.log(e);}
    //5. Create the 3rd movie of your choice.
    try {
        httyd = await createMovie("How to Train Your Dragon", `A hapless young Viking who aspires to hunt dragons becomes the 
        unlikely friend of a young dragon himself, and learns there may be more to the creatures than he assumed.`, 
        ["Animation", "Adventure", "Fantasy", "Family Film"],
        "PG-13", "DreamWorks Animation", "Dean DeBlois", 
        ["Jay Baruchel", "Gerard Butler", "Christopher MintzPlasse"], "03/26/2010", "1h 38min"
        );
    } catch (e) {console.log(e);}
    //6. Log the newly created 3rd movie. (Just that movie, not all movies)
    try {
        console.log(httyd);
    } catch (e) {console.log(e);}
    //7. Rename the first movie
    try {
        dps = await renameMovie(dps._id, "dead poets society");
    } catch (e) {console.log(e);}
    //8. Log the first movie with the updated name.
    try { 
        console.log(dps);
    } catch (e) {console.log(e);}
    //9. Remove the second movie you created.
    try {
        outsiders = await removeMovie(outsiders._id);
        console.log(outsiders);
    } catch (e) {console.log(e);}
    //10. Query all movies, and log them all
    try {
        all_movies = await getAllMovies();
        console.log(all_movies);
    } catch (e) {console.log(e);}
    //11. Try to create a movie with bad input parameters to make sure it throws errors.
    try {
        let badmovie1 = await createMovie("How to Train Your Dragon", `A hapless young Viking who aspires to hunt dragons becomes the 
        unlikely friend of a young dragon himself, and learns there may be more to the creatures than he assumed.`, 
        ["Animation", "Adventure", "Fantasy", "Family Film"],
        "PG-13", "DreamWorks Animation", "Dean DeBlois", 
        ["Jay Baruchel", "Gerard Butler", "Christopher MintzPlasse"], "02/28/2010", "10h -31min");
        console.log(badmovie1);
    } catch (e) {
        console.log(e.toString());
    }
    //12. Try to remove a movie that does not exist to make sure it throws errors.
    try {
        let badremove1 = await removeMovie("507f1f77bcf86cd799439012");
        console.log(badremove1);
    }
    catch (e) {console.log(e);}
    //13. Try to rename a movie that does not exist to make sure it throws errors.
    try {
        let badrename1 = await renameMovie("507f1f77bcf86cd799439012", "Love In Paradise");
        console.log(badrename1);
    }
    catch (e) {console.log(e);}
    //14. Try to rename a movie passing in invalid data for the newName parameter to make sure it throws errors.
    try {
        let badrename2 = await renameMovie(httyd._id, "Love In Paradise!!!");
        console.log(badrename2);
    }
    catch (e) {console.log(e);}
    //15. Try getting a movie by ID that does not exist to make sure it throws errors.
    try {
        let badGetId = await getMovieById("507f1f77bcf86cd799439012");
        console.log(badGetId);
    }
    catch (e) {console.log(e);}
    
    await closeConnection();
    console.log('Done!');
}
main();