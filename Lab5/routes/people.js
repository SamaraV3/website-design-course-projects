//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes
import express from 'express';
import {getPeople, getPersonById} from "../data/data.js";
//You can import your getPeople() function in the /data/data.js file to return the list of people.  You can also import your getPersonById(id) function and call it in the :/id route.
const router = express.Router();

router.route('/')
// Implement GET Request Method and send a JSON response  See lecture code!
.get(async (req, res) => {
    try {
      //console.log("Fetching Data....");
      const personList = await getPeople();
      //console.log("Data Received!");
      return res.json(personList);
    } catch (e) {
    //console.log("Oopsies....");
      return res.status(500).send(e);
    }
  });

router.route('/:id')
// Implement GET Request Method and send a JSON response See lecture code!
.get(async (req, res) => {
    try {
      const person = await getPersonById(req.params.id);
      return res.json(person);
    } catch (e) {
      return res.status(404).json({ error: "Person Not Found!" });
    }
  });

export default router;
