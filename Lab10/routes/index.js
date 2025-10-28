import authRoute from "./auth_routes.js";
const constructorMethod = (app) => {
    app.use('/', authRoute);
  
    app.use(/(.*)/, (req, res) => {
      return res.status(404).json({error: 'Not found'});
    });
};
  
export default constructorMethod;