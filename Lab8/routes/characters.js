//import express and express router as shown in lecture code and worked in previous labs.  Import your data functions from /data/characters.js that you will call in your routes below
import {Router} from 'express';
import * as characterFuncs from "../data/characters.js";
const router = Router();

router.route('/').get(async (req, res) => {
  //code here for GET will render the home handlebars file
  res.render('home', {title: "Marvel Universe Character Search"});

});

router.route('/searchmarveluniverse').post(async (req, res) => {
  //code here for POST this is where your form will be submitting searchCharacterByName and then call your data function passing in the searchCharacterByName and then rendering the search results of up to 15 characters.
  try {
    const charName = req.body.searchByCharactersName;
    const heroes = await characterFuncs.searchCharactersByName(charName);
    if (heroes.length == 0) {
      res.status(404).send(`
      <p class="not-found">We're sorry, but no results were found for ${charName}.</p>
      <a href="/" id="research">Search For Another Character</a>
      `);
    }
    else {res.status(200).render('characterSearchResults', {title: "Characters Found", charName: charName, characters: heroes});}
  } catch (e) {
    res.status(400).render("error", 
      {title: "Input String Error in searchmarveluniverse",
        message: e.toString()
      }
    );
  }
});

router.route('/character/:id').get(async (req, res) => {
  //code here for GET a single character
  try {
    const idAsNum = parseInt(req.params.id);
    if (isNaN(idAsNum)) {throw new Error("id is not a number");}
    let info = await characterFuncs.getCharacterById(idAsNum);
    info = info[0];
    if (!info) {
      res.status(404).send(`
      <p class="error">We're sorry, but no results were found for character with id ${req.params.id}.</p>
      <a href="/">Search For Another Character</a>
      `);
    } else {
      //console.log(info);
      res.status(200).render(
        "characterById", {
          title: info.name,
          charName: info.name,
          path: info.thumbnail.path,
          desc: info.description || "None",
          comics: info.comics.items
        }
      );
    }
  } catch (e) {
    if (e.response?.status === 404) {
      // Marvel API returned a 404 so the character ID wasnt found
      //so react accordingly!
      res.status(404).render("error", {
        title: "Character Not Found",
        message: `No character found for ID: ${req.params.id}`
      });
    } else {//there was an input string error
      res.status(404).render("error", 
        {title: "Input String Error in /character/:id",
          message: e.toString()
        }
      );
    }
  }
});

//export router
export default router;