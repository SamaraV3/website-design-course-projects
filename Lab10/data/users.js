//import mongo collections, bcrypt and implement the following data functions
import {users} from "../config/mongoCollections.js";
import bcrypt from 'bcrypt';
import validation from "../helpers.js";

const saltRounds = 16;

export const register = async (
  firstName,
  lastName,
  userId,
  password,
  favoriteQuote,
  themePreference,
  role
) => {
  validation.firstName(firstName);
  firstName = firstName.trim();

  validation.lastName(lastName);
  lastName = lastName.trim();

  validation.userId(userId);
  //now check if userId is in database by
  //1: make it lowercase, 2: compare to all other ones
  userId = userId.trim().toLowerCase();
  const userCollection = await users();
  let foundUsers = await userCollection.findOne({ userId: userId});
  if (foundUsers!=null) {
    //console.log(foundUsers);
    throw new Error("duplicate userId not allowed");
  }

  validation.password(password);
  password = password.trim();

  validation.favoriteQuote(favoriteQuote);
  favoriteQuote = favoriteQuote.trim();

  validation.themePreference(themePreference);
  themePreference["backgroundColor"] = themePreference["backgroundColor"].trim();
  themePreference["fontColor"] = themePreference["fontColor"].trim();

  validation.role(role);
  role = role.trim().toLowerCase();

  //now create signupDate
  let date = new Date();
  let month = String(date.getMonth()+1).padStart(2,'0');
  let day = String(date.getDate()).padStart(2,'0');
  let yr = date.getFullYear();
  const signupDate = month + "/" + day + "/" + yr;

  //hash the password
  const hash = await bcrypt.hash(password, saltRounds);

  //and create object for database
  const userObj = {
    firstName: firstName,
    lastName: lastName,
    userId: userId,
    password: hash,
    favoriteQuote: favoriteQuote,
    themePreference: themePreference,
    role: role,
    signupDate: signupDate,
    lastLogin: date.toLocaleString()
  };

  const insertInfo = await userCollection.insertOne(userObj);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) {throw 'Could not add user';}

  return {registrationCompleted: true};
};

export const login = async (userId, password) => {
  validation.userId(userId);
  userId = userId.trim().toLowerCase();
  validation.password(password);
  password = password.trim();

  const userCollection = await users();
  let foundUsers = await userCollection.findOne({ userId: userId});
  if (foundUsers==null) {
    throw new Error("Either the userId or password is invalid");
  }

  if (await bcrypt.compare(password, foundUsers.password) != 1) {
    throw new Error("Either the userId or password is invalid");
  }

  //getting here means password matched
   //now create signupDate
  let date = new Date();
  let month = String(date.getMonth()+1).padStart(2,'0');
  let day = String(date.getDate()).padStart(2,'0');
  let yr = date.getFullYear();
  const loginDate = month + "/" + day + "/" + yr;

  let hr = String(date.getHours() % 12 || 12).padStart(2, '0');
  let min = String(date.getMinutes()).padStart(2,'0');
  let ampm = "AM";
  if (date.getHours() >= 12) {ampm = "PM";}
  const loginTime = hr + ":" + min + ampm;

  const completeLogin = loginDate + " " + loginTime;
  await userCollection.updateOne(
    {userId: userId},
    { $set: {lastLogin: completeLogin} }
  );

  return await userCollection.findOne(
    {userId: userId},
    {projection: 
      {_id: 0, password: 0}
    }
    );


};
