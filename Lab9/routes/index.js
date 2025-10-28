//Here you will import route files and export them as used in previous labs.

import arraySortRoute from "./arraySort.js";
const constructorMethod = (app, root) => {
    app.use('/', arraySortRoute(root));
  
    app.use(/(.*)/, (req, res) => {
      return res.status(404).json({error: 'Not found'});
    });
  };
  
  export default constructorMethod;