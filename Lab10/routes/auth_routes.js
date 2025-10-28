//import express, express router as shown in lecture code
import {Router} from 'express';
const router = Router();
import bcrypt from 'bcrypt';
import { register, login } from "../data/users.js";

router.route('/').get(async (req, res) => {
  //code here for GET
  
  //check if session user exists
  if (!req.session.user) {//user not signed in: display 2 links
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Login System</title>
        <link rel="stylesheet" href="/public/css/sitestyles.css">
      </head>
      <body>
        <h1 id="appTitle">Lab 10 - Login System</h1>
        <p id="siteDescription">This is a login system for lab 10, the final lab of the semester! We survived!</p>
        <a id="signuplink" href="/register">Register Here</a>
        <a id="loginlink" href="/login">Login Here</a>
        <footer>Samara Vassell 20026451</footer>
        <script src="/public/js/form_validate.js"></script>
      </body>
      </html>
    `;
    res.send(html);
  }
  else if (req.session.user.role == 'superuser') {//user is a superuser: display 2 different links
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Login System</title>
        <link rel="stylesheet" href="/public/css/sitestyles.css">
        <style>
          body {
            background-color: ${req.session.user.themePreference.backgroundColor};
            color: ${req.session.user.themePreference.fontColor};
          }
        </style>
      </head>
      <body>
        <h1 id="appTitle">Lab 10 - Login System</h1>
        <p id="siteDescription">This is a login system for lab 10, the final lab of the semester! We survived!</p>
        <a id="userlink" href="/user">User Page</a>
        <a id="superuserlink" href="/superuser">Super User Page</a>
        <footer>Samara Vassell 20026451</footer>
        <script src="/public/js/form_validate.js"></script>
      </body>
      </html>
    `;
    res.send(html);
  }
  else {//user is a normal user so display 1 link
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Login System</title>
        <link rel="stylesheet" href="/public/css/sitestyles.css">
        <style>
          body {
            background-color: ${req.session.user.themePreference.backgroundColor};
            color: ${req.session.user.themePreference.fontColor};
          }
        </style>
      </head>
      <body>
        <h1 id="appTitle">Lab 10 - Login System</h1>
        <p id="siteDescription">This is a login system for lab 10, the final lab of the semester! We survived!</p>
        <a id="userlink" href="/user">User Page</a>
        <footer>Samara Vassell 20026451</footer>
        <script src="/public/js/form_validate.js"></script>
      </body>
      </html>
    `;
    res.send(html);
  }
});

router
  .route('/register')
  .get(async (req, res) => {
    //code here for GET
    res.render('register');
  })
  .post(async (req, res) => {
    //code here for POST
    try {
      const { firstName, lastName, userId, password, confirmPassword, favoriteQuote, backgroundColor, fontColor, role} = req.body;
      if (password.localeCompare(confirmPassword) != 0) {throw new Error("password and confirmPassword must match");}
      let theme_pref = {backgroundColor: backgroundColor,
        fontColor: fontColor
      };
      let ret_val = await register(firstName, lastName, userId, password, favoriteQuote, theme_pref, role);
      if (ret_val == null || ret_val == undefined || typeof ret_val != "object" || 
        ret_val.registrationCompleted != true || Object.keys(ret_val).length != 1) {
          res.status(500).render('register', {message: "Internal Server Error"});
          console.log("we got here my dude");
          return;
        }
      res.status(200).redirect("/login");
    }
    catch (e) {
      res.status(400).render('register', {
        message: e.toString().replace("Error: ", "")
      });
    }
  });

router
  .route('/login')
  .get(async (req, res) => {
    res.render('login');
  })
  .post(async (req, res) => {
    //code here for POST
    const { userId, password } = req.body;
    try {
      let retVal = await login(userId, password);
      req.session.user = retVal;
      if (req.session.user.role == 'superuser') {res.redirect("/superuser");}
      else {res.redirect("/user");}
    }
    catch (e) {
        res.status(400).render('login', {
          message: e.toString().replace("Error: ", "")
        });
    }
  });

router.route('/user').get(async (req, res) => {
  //code here for GET
  const today = new Date();
  res.status(200).render('user', {
    firstName: req.session.user.firstName,
    lastName: req.session.user.lastName,
    currentTime: today.toLocaleTimeString(),
    currentDate: today.toLocaleDateString(),
    role: req.session.user.role,
    signupDate: req.session.user.signupDate,
    lastLogin: req.session.user.lastLogin,
    favoriteQuote: req.session.user.favoriteQuote,
    isSuperUser: req.session.user.role == 'superuser',
    backgroundColor: req.session.user.themePreference.backgroundColor,
    fontColor: req.session.user.themePreference.fontColor
  });
});

router.route('/superuser').get(async (req, res) => {
  //code here for GET
  const today = new Date();
  res.status(200).render('superuser', {
    firstName: req.session.user.firstName,
    lastName: req.session.user.lastName,
    currentTime: today.toLocaleTimeString(),
    currentDate: today.toLocaleDateString(),
    role: req.session.user.role,
    signupDate: req.session.user.signupDate,
    lastLogin: req.session.user.lastLogin,
    favoriteQuote: req.session.user.favoriteQuote,
    backgroundColor: req.session.user.themePreference.backgroundColor,
    fontColor: req.session.user.themePreference.fontColor
  });
});

router.route('/signout').get(async (req, res) => {
  //code here for GET
  req.session.destroy();
  res.status(200).render('signout');
});

export default router;