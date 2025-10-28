// Setup server, session and middleware here.

/*
Middlewares
You will have the following middleware functions:

This middleware will apply to the root route / (note, a middleware applying to the root route is the same as a middleware that fires for every request) and will do one of the following:
This middleware will log to your console for every request made to the server, with the following information:
Current Timestamp: new Date().toUTCString()
Request Method: req.method
Request Path: req.path
Some string/boolean stating if a user is authenticated
If logged in, the users status (superuser or user)
    There is no precise format you must follow for this. The only requirement is that it logs the data stated above.

     An example would be:

    [Sun, 14 Apr 2019 23:56:06 GMT]: GET / (Non-Authenticated)

     [Sun, 14 Apr 2019 23:56:14 GMT]: POST /login (Non-Authenticated)

     [Sun, 14 Apr 2019 23:56:19 GMT]: GET /userProfile (Authenticated Super User)

     [Sun, 14 Apr 2019 23:56:44 GMT]: GET / (Authenticated User)

Then call next

3. This middleware will only be used for the GET /login route and will do one of the following:    
     A. If the user is authenticated AND they have a role of superuser, the middleware function will redirect them to the /superuser route,
     B. If the user is authenticated AND they have a role of user, you will redirect them to the /user route.
     C. If the user is NOT authenticated, you will allow them to get through to the GET /login route. A logged in user should never be able to access the sign in form.

4. This middleware will only be used for the GET /login route and will do one of the following:
     A. If the user is authenticated AND they have a role of superuser, the middleware function will redirect them to the /superuser route,
     B. If the user is authenticated AND they have a role of user, you will redirect them to the /user route.
     C. If the user is NOT authenticated, you will allow them to get through to the GET /signupuser route. A logged in user should never be able to access the registration form.

5. This middleware will only be used for the GET /user route and will do one of the following:
     A. If a user is not logged in, you will redirect to the GET /login route.
     B. If the user is logged in, the middleware will "fall through" to the next route calling the next() callback. (Users with both roles superuser or user should be able to access the /user route, so you simply need to make sure they are authenticated in this middleware.)

6. This middleware will only be used for the GET /superuser route and will do one of the following: 
    A. If a user is not logged in, you will redirect to the GET /login route.
    B. If a user is logged in, but they are not an super user, you end the response right in the middleware function and render a HTML error page saying that the user does not have permission to view the page, and the page must issue an HTTP status code of 403. (provide a link to the /user page, since they are logged in, just not an super user)
   C. If the user is logged in AND the user has a role of superuser, the middleware will "fall through" to the next route calling the next() callback.
 ONLY USERS WITH A ROLE of superuser SHOULD BE ABLE TO ACCESS THE /superuser ROUTE!

7. This middleware will only be used for the GET /signout route and will do one of the following:   
     If a user is not logged in, you will redirect to the GET /login route.
     If the user is logged in, the middleware will "fall through" to the next route calling the next() callback.



*/
import express from 'express';
const app = express();
import configRoutes from './routes/index.js';
import exphbs from 'express-handlebars';
import session from 'express-session';
import { register, login } from "./data/users.js";
import {dbConnection, closeConnection} from './config/mongoConnection.js';

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
     // If the user posts to the server with a property called _method, rewrite the request's method
     // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
     // rewritten in this middleware to a PUT route
     if (req.body && req.body._method) {
       req.method = req.body._method;
       delete req.body._method;
     }
     // let the next middleware run:
     next();
};

app.use('/public', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(
     session({
          name: 'AuthenticationState',
          secret: "Semester almost over woohoo",
          saveUninitialized: false,
          resave: false,
          cookie: {maxAge: 60000}
     })
);

app.use('/', async (req, res, next) => {
     if (req.session.user) {//they are authenticated
          if (req.session.user.role == 'superuser') {
               console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.path} (Authenticated Super User)`);
          }
          else {
               console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.path} (Authenticated User)`);
          }
     }
     else {//theyre NOT authenticated
          console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.path} (Non-Authenticated)`);
     }
     next();
});

app.get('/login', async (req, res, next) => {
     if (req.session.user && req.session.user.role == 'superuser') {//authenticated AND superuser role
          res.redirect('/superuser');
     }
     else if (req.session.user && req.session.user.role == 'user') {//authenticated AND user role
          res.redirect("/user");
     }
     else {//non-authenticated
          next();
     }
});

app.get('/register', async (req, res, next) => {
     if (req.session.user && req.session.user.role == 'superuser') {//authenticated AND superuser role
          res.redirect('/superuser');
     }
     else if (req.session.user && req.session.user.role == 'user') {//authenticated AND user role
          res.redirect("/user");
     }
     else {//non-authenticated
          next();
     }
});

app.get('/user', async (req, res, next) => {
     if (req.session.user) {//is logged in
          next();
     }
     else {res.redirect("/login");}
});

app.get('/superuser', async (req, res, next) => {
     if (req.session.user && req.session.user.role == 'superuser') {//authenticated AND superuser role
          next();
     }
     else if (req.session.user && req.session.user.role == 'user') {//authenticated AND user role
          res.status(403).render('error', {
               message: "User does not have permission to view the page",
               backgroundColor: req.session.user.themePreference.backgroundColor,
               fontColor: req.session.user.themePreference.fontColor
          });
     }
     else {//non-authenticated
          res.redirect("/login");
     }
});

app.get('/signout', async (req, res, next) => {
     if (req.session.user) {//is logged in
          next();
     }
     else {res.redirect("/login");}
});


app.use(rewriteUnsupportedBrowserMethods);

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(3000, () => {
console.log("We've now got a server!");
console.log('Your routes will be running on http://localhost:3000');
});
async function populate_database() {
     const db = await dbConnection();
     await db.dropDatabase();
     console.log(await register('Patrick',
          'Hill',  
          'graffixnyc',
          '@PainTurfs7',
          "We have two lives, the 2nd begins when you realize you only have one.",
          {backgroundColor: "#000000", fontColor: "#FFFFFF" },
     'superuser'));
     try {
          console.log(await login("Samara", "@PainTurfs7"));
     } catch (err) {
          console.log(err.toString());
     }
     console.log();
     try {
          console.log(await login("GRAFFIXnyc", "@PainTurfs7"));
     } catch (err) {
          console.log(err.toString());
     }
     await closeConnection();
     console.log('Done!');
}

//await populate_database();