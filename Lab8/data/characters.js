//import axios, md5
import axios from "axios";
import md5 from 'blueimp-md5' //you will need to install this module;
import * as validation from "../helpers.js";

const publickey = '49a310a40eb417bf67dd68cc04f69a6b';
const privatekey = 'c32b9887237eba0817b9dcf33c75f18ddde44374';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

export const searchCharactersByName = async (name) => {
  //Function to search the api and return up to 15 characters matching the name param
  validation.basicStringCheck(name);
  name = name.trim();
  let curr_url = url + "&nameStartsWith=" + name + "&limit=20";
  const { data } = await axios.get(curr_url);
  return data.data.results;
};

export const getCharacterById = async (id) => {
  //Function to fetch a character from the api matching the id
  if (id==undefined) {throw new Error("id is empty");}
  if (typeof id != "number") {throw new Error("id is not a number");}
  let curr_url = baseUrl + "/" + id + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
  const { data } = await axios.get(curr_url);
  return data.data.results;
};
