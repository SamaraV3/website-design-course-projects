/*
import express and express router as shown in lecture code and worked in previous labs.
Your server this week should not be doing any of the processing! Your server only exists to allow someone to get to the HTML Page and download the associated assets to run the array sort page.

you just need one route to send the static homepage.html file using the res.sendFile method. 
*/

import {Router} from 'express';
import path from "path";
const router = Router();
const arraySortRoute = (root) => {
    router.route('/').get(async (req, res) => {
        res.sendFile(path.join(root, "static", "homepage.html"));
    });
    return router;
};

export default arraySortRoute;