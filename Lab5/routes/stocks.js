//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes
import express from 'express';
import {getStocks, getStockById} from "../data/data.js";
//You can import your getStocks() function in the /data/data.js file 3 to return the list of stocks and call it in the /stocks route.  You can also import your getStockById(id) function and call it in the :/id route.

const router = express.Router();

router.route('/')
// Implement GET Request Method and send a JSON response See lecture code!
.get(async (req, res) => {
    try {
      const stockList = await getStocks();
      return res.json(stockList);
    } catch (e) {
      return res.status(500).send(e);
    }
  });

router.route('/:id')
//Implement GET Request Method and send a JSON response See lecture code!
.get(async (req, res) => {
    try {
      const stock = await getStockById(req.params.id);
      return res.json(stock);
    } catch (e) {
      return res.status(404).json({ error: "Stock Not Found!" });
    }
  });

export default router;
