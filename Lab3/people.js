//Export the following functions using ES6 Syntax
import axios from 'axios';
async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json')
    return data; // this will be the array of people objects
}

const getPersonById = async (id) => {
    //first check id exists, is a string, and when trimmed is not length 0
    if (id==undefined||typeof id != "string") {throw new Error("id is of wrong type");}
    id = id.trim();
    if (id.length == 0) {throw new Error("id is not a valid string");}
    //first get data from getPeople
    try {
    let data = await getPeople();
    //helper function
    let isPerson = (person) => {return person.id==id;}
    let person = data.find(isPerson);
    if (person==undefined) {throw new Error("person not found");}
    return person;
    } catch (e) {throw e;}
};

const sameJobTitle = async (jobTitle) => {
    //first check if jobTitle exists, is a string, and when trimmed is not length 0
    if (jobTitle==undefined || typeof jobTitle != "string" || jobTitle.trim().length == 0) {
        throw new Error("invalid job title");
    }
    jobTitle = jobTitle.trim().toLowerCase();
    let ret_arr = [];
    try {
    let data = await getPeople();
    //iterate over every value in data
    for (let person of data) {
        if ((person.job_title != undefined)&&person.job_title.trim().toLowerCase()==jobTitle) {ret_arr.push(person);}
    }
    if (ret_arr.length < 2) {throw new Error("less than 2 people found");}
    return ret_arr;
    } catch (e) {throw e;} 
};

const getPostalCodes = async (city, state) => {
    //checks on city param
    if (city==undefined || typeof city != "string" || city.trim().length==0) {throw new Error("invalid city");}
    //checks on state param
    if (state==undefined || typeof state != "string" || state.trim().length==0) {throw new Error("invalid state");}
    city = city.trim().toLowerCase();
    state = state.trim().toLowerCase();
    let ret_arr = [];
    try {
    let data = await getPeople();
    //iterate over every value in data
    for (let person of data) {
        //check if person.city and person.state are defined
        if (person.city==undefined || person.state==undefined) {continue;}
        let p_city = person.city.trim().toLowerCase();
        let p_state = person.state.trim().toLowerCase();
        if (p_city==city && p_state==state) {
            //now check if postal_code is defined
            if (person.postal_code!=undefined) {ret_arr.push(person.postal_code);}
        }
    }
    if (ret_arr.length < 2) {throw new Error("less than 2 codes found");}
    return ret_arr.sort();
    } catch (e) {throw e;} 
};

const sameCityAndState = async (city, state) => {
    //checks on city param
    if (city==undefined || typeof city != "string" || city.trim().length==0) {throw new Error("invalid city");}
    //checks on state param
    if (state==undefined || typeof state != "string" || state.trim().length==0) {throw new Error("invalid state");}
    city = city.trim().toLowerCase();
    state = state.trim().toLowerCase();
    let ret_arr = [];
    try {
    let data = await getPeople();
    //iterate over every value in data
    for (let person of data) {
        //check if person.city and person.state are defined
        if (person.city==undefined || person.state==undefined) {continue;}
        let p_city = person.city.trim().toLowerCase();
        let p_state = person.state.trim().toLowerCase();
        if (p_city==city && p_state==state) {
            //now check if postal_code is defined
            if (person.postal_code!=undefined) {ret_arr.push([person.first_name, person.last_name]);}
        }
    }
    if (ret_arr.length < 2) {throw new Error("less than 2 codes found");}
    ret_arr = ret_arr.sort(function(a, b) {
        return a[1].localeCompare(b[1]) != 0 ? a[1].localeCompare(b[1]) : a[0].localeCompare(b[0]);
      });//sorts array by second elements, AKA surnames
    
    return ret_arr.map(subArray => subArray.join(" "));
    }
    catch (e) {throw e;}
};


export {getPeople, getPersonById, sameJobTitle, getPostalCodes, sameCityAndState};