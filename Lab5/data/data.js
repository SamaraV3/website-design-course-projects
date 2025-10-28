/*Here, you can export the data functions
to get the stocks, people, getStockById, getPersonById.  You will import these functions into your routing files and call the relevant function depending on the route. 
*/
import axios from 'axios';

const getStocks = async () => {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json')
    return data; // this will be the array of stocks objects
};

const getPeople = async () => {
    try {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json')
    return data; // this will be the array of people objects
    } catch (e) {console.log("Test Failed: ", e.message);}
};

const getStockById = async (id) => {
    //first check id exists, is a string, and when trimmed is not length 0
    if (id==undefined||typeof id != "string") {throw new Error("id is of wrong type");}
    id = id.trim();
    if (id.length == 0) {throw new Error("id is not a valid string");}
    //first get data from getStocks
    try {
    let data = await getStocks();
    let stock = undefined;
    //helper function
    let isStock = (stock) => {return stock.id==id;}
    stock = data.find(isStock);
    if (stock==undefined) {throw new Error("Stock Not Found!");}
    return stock;
    } catch (e) {throw e;}
};

const getPersonById = async (id) => {
    //first check id exists, is a string, and when trimmed is not length 0
    if (id==undefined||typeof id != "string") {throw new Error("id is of wrong type");}
    id = id.trim();
    if (id.length == 0) {throw new Error("id is not a valid string");}
    //first get data from getPeople
    try {
    let data = await getPeople();
    let person=undefined;
    //helper function
    let isPerson = (person) => {return person.id==id;}
    person = data.find(isPerson);
    if (person==undefined) {throw new Error("Person Not Found!");}
    return person;
    } catch (e) {throw e;}
};

export {getStocks, getPersonById, getPeople, getStockById};