//here is where you'll set up your server as shown in lecture code.
import movies from "./data/movies.js";
import reviews from "./data/reviews.js";
import {dbConnection, closeConnection} from './config/mongoConnection.js';
import express from 'express';
const app = express();
import configRoutesFunction from './routes/index.js';

async function populate_database() {
    const db = await dbConnection();
    await db.dropDatabase();
    let dps = undefined; let outsiders = undefined; let httyd = undefined; let croods = undefined; let bsd = undefined;
    let hotel_transylvania = undefined; let infinity_war = undefined; let endgame = undefined; let shazam = undefined; let deadpool = undefined;
    dps = await movies.createMovie("Dead Poets Society", `Maverick teacher John Keating returns in 1959 to the prestigious New England boys' 
        boarding school where he was once a star student, using poetry to embolden his pupils to new heights of self-expression.`,
    ["Coming of Age", "Melodrama"], "PG-13", "Touchstone Pictures", "Peter Weir",
    ["Robin Williams", "Robert SeanLeonard", "Ethan Hawke", "Gale Hansen", "Josh Charles", "Dylan Kussman", "Allelon Ruggiero",
    "James Waterson"], "06/02/1989", "2h 8min");
    await reviews.createReview(dps._id.toString(), "Lovely!", "Samara Vassell", "Beautiful Movie. 10/10 would recomend", 5);
    await reviews.createReview(dps._id.toString(), "Interesting", "Shannon Vassell", "Sis made me watch. It was aight", 4.5);

    outsiders = await movies.createMovie("The Outsiders", `In a small Oklahoma town in 1964, the rivalry between two gangs, the 
        poor Greasers and the rich Socs, heats up when one gang member accidentally kills a member of the other.`, 
        ["Coming of Age", "Action", "  Crime   "],
        "PG-13", "Zoetrope Studios", "Francis FordCoppola", 
        ["Matt Dillon", "Ralph Macchio", "Christopher ThomasHowell", "Patrick Swayze", "Rob Lowe", "Tom Cruise", "Emilio Estevez"],
        "03/25/1983", "1h 54min");
    await reviews.createReview(outsiders._id.toString(), "Meh", "James Bond", "Not the worst. The book was better though.", 3);
    await reviews.createReview(outsiders._id.toString(), "Loved it!", "Beatrice Gomez", "Really cool movie! My favorite character was Ponyboy", 4.9);

    httyd = await movies.createMovie("How to Train Your Dragon", `A hapless young Viking who aspires to hunt dragons becomes the 
        unlikely friend of a young dragon himself, and learns there may be more to the creatures than he assumed.`, 
        ["Animation", "Adventure", "Fantasy", "Family Film"],
        "PG-13", "DreamWorks Animation", "Dean DeBlois", 
        ["Jay Baruchel", "Gerard Butler", "Christopher MintzPlasse"], "03/26/2010", "1h 38min");
    await reviews.createReview(httyd._id.toString(), "Awesome", "Samara Vassell", "Favorite movie of all time! Always makes me feel things.", 5);
    await reviews.createReview(httyd._id.toString(), "Aight", "Shannon Vassell", "Aight movie i guess. Pretty cool graphics", 4.6);

    croods = await movies.createMovie("The Croods", `In the primeval era, Grug and his family risk the dangers of their 
        surroundings to find a new dwelling place. Along the way, they meet a modern boy who woos them with his 
        adventurous ways.`, ["Animation", "Adventure", "Comedy"],
        "PG-13", "DreamWorks Animation", "Chris Sanders",
        ["Nicolas Cage", "Ryan Reynolds", "Emma Stone"], "03/22/2013", "1h 38min");
    await reviews.createReview(croods._id.toString(), "Family Fun", "Suziette SmallVassell", "Great movie for the family!", 5.0);
    await reviews.createReview(croods._id.toString(), "Boring", "Shawn Vassell", "Boring kids movie. Did not enjoy", 2.5);

    bsd = await movies.createMovie("Bungo Stray Dogs Dead Apple", `The Armed Detective Agency investigates a 
        bizarre series of suicides involving an eerie mist.`, ["Anime", "Mystery"],
        "PG-13", "Bones", "Takuya Igarashi", ["Brian Beacock", "Ray Chase", "Lucien Dodge"], "05/02/2018", "1h 32min");
    await reviews.createReview(bsd._id.toString(), "Cool", "John Cena", "Cool movie", 4.5);
    await reviews.createReview(bsd._id.toString(), "Pretentious", "Fyodor Dostoevsky", "A pretentious piece of crap", 1.0);

    hotel_transylvania = await movies.createMovie("Hotel Transylvania", `Dracula, who operates a high-end
         resort away from the human world, goes into overprotective mode when a boy discovers the
          resort and falls for the count's teenaged daughter.`, ["Animation", "Dark Fantasy", "Comedy"],
        "PG", "Sony Pictures Animation", "Genndy Tartakovsky", ["Adam Sandler", "Selena Gomez", "Kevin James"],
        "09/28/2012", "1h 31min");
    await reviews.createReview(hotel_transylvania._id.toString(), "Family Fun", "Suziette SmallVassell", "Great movie for the family!", 5.0);
    await reviews.createReview(hotel_transylvania._id.toString(), "Boring", "Shawn Vassell", "Boring kids movie. Did not enjoy", 2.5);

    infinity_war = await movies.createMovie("Avengers Infinity War", `The Avengers and their allies must
         be willing to sacrifice all in an attempt to defeat the powerful Thanos before his 
         blitz of devastation and ruin puts an end to the universe.`, ["Action", "Superhero", "Sci Fi"],
        "PG-13", "Marvel Studios", "Anthony Russo", ["Robert DowneyJr", "Chris Hemsworth", "Mark Ruffalo"],
        "04/27/2018", "2h 29min");
    await reviews.createReview(infinity_war._id.toString(), "Awesome", "Cameron Small", "Favorite movie of all time! Always makes me feel things.", 5);
    await reviews.createReview(infinity_war._id.toString(), "Aight", "Azaria Small", "Aight movie i guess. Pretty cool graphics", 4.6);

    endgame = await movies.createMovie("Avengers Endgame", `After the devastating events of 
        Avengers: Infinity War (2018), the universe is in ruins. With the help of 
        remaining allies, the Avengers assemble once more in order to reverse Thanos' 
        actions and restore balance to the universe.`, ["Action", "Superhero", "Sci Fi"],
        "PG-13", "Marvel Studios", "Anthony Russo", ["Robert DowneyJr", "Chris Evans", "Mark Ruffalo"],
        "04/26/2019", "3h 1min");
    await reviews.createReview(endgame._id.toString(), "Cool", "John Cena", "Cool movie", 4.5);
    await reviews.createReview(endgame._id.toString(), "Pretentious", "Fyodor Dostoevsky", "A pretentious piece of crap", 1.0);

    shazam = await movies.createMovie("Shazam", `A newly fostered young boy in search of 
        his mother instead finds unexpected super powers and soon gains a powerful enemy.`,
        ["Action", "Superhero", "Comedy"], "PG-13", "DC Films", "David FSandberg",
        ["Zachary Levi", "Mark Strong", "Asher Angel"], "04/05/2019", "2h 12min");
    await reviews.createReview(shazam._id.toString(), "Family Fun", "Suziette SmallVassell", "Great movie for the family!", 5.0);
    await reviews.createReview(shazam._id.toString(), "Boring", "Shawn Vassell", "Boring kids movie. Did not enjoy", 2.5);

    deadpool = await movies.createMovie("Deadpool", `A wisecracking mercenary gets 
        experimented on and becomes immortal yet hideously scarred, and sets out to 
        track down the man who ruined his looks.`, ["Dark Comedy", "Action", "Superhero"],
        "R", "Marvel Studios", "Tim Miller", ["Ryan Reynolds", "Morena Baccarin", "ToddJoseph Miller"],
        "02/12/2016", "1h 48min");
    await reviews.createReview(deadpool._id.toString(), "Meh", "James Bond", "Not the worst. The comics are better though.", 3);
    await reviews.createReview(deadpool._id.toString(), "Loved it!", "Beatrice Gomez", "Really cool movie! My favorite character was Vanessa", 4.9);
    
    
    await closeConnection();
    console.log('Done!');
};


//populate_database();
app.use(express.json());
configRoutesFunction(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});