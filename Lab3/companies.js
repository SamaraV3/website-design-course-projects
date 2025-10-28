import axios from 'axios';
import {getPeople} from "./people.js";

async function getCompanies(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/90b56a2abf10cfd88b2310b4a0ae3381/raw/f43962e103672e15f8ec2d5e19106e9d134e33c6/companies.json')
    return data; // this will be the array of companies objects
}

//Export the following functions using ES6 Syntax
const listEmployees = async (companyName) => {
    if (companyName==undefined || typeof companyName != "string" || companyName.trim().length==0) {
        throw new Error("parameter is of incorrect type");
    }
    //convert companyName to trim and lowercase
    companyName = companyName.trim().toLowerCase();
    try {
        let peopleData = await getPeople();
        let companyData = await getCompanies();
        let companyObject = undefined;
        //check if companyName exists in getCompanies
        for (let c of companyData) {
            if (c.name.trim().toLowerCase()==companyName) {
                companyObject = c;
                break;
            }
        }
        //return error if companyObject is undefined
        if (companyObject==undefined) {throw new Error(`No company name with ${companyName}`); }
        //getting here implied that it is defined. so find ppl with the id in companyObject
        let getPeopleByCompanyId = (companyId) => {
            let ret_arr = [];
            for (let person of peopleData) {
                if (person.company_id==companyId) {ret_arr.push([person.first_name, person.last_name]);}
            }
            ret_arr = ret_arr.sort(function(a, b) {
                return a[1].localeCompare(b[1]) != 0 ? a[1].localeCompare(b[1]) : a[0].localeCompare(b[0]);
              });//sorts array by second elements, AKA surnames
            
            return ret_arr.map(subArray => subArray.join(" "));
        }
        companyObject["employees"] = getPeopleByCompanyId(companyObject.id);
        return companyObject;
    }
    catch (e) {throw e;}
};

const sameIndustry = async (industry) => {
    if (industry == undefined || typeof industry != "string" || industry.trim().length==0) {
        throw new Error("parameter is of incorrect type");
    }
    industry = industry.trim().toLowerCase();
    try {
        let ret_arr = [];
        let companyData = await getCompanies();
        for (let company of companyData) {
            if (company.industry.trim().toLowerCase()==industry) {
                ret_arr.push(company)
            }
        }
        if (ret_arr.length == 0) {throw new Error("No companies in that industry");}
        return ret_arr;
    }
    catch (e)  {throw e;}
};

const getCompanyById = async (id) => {
    //first check id exists, is a string, and when trimmed is not length 0
        if (id==undefined||typeof id != "string") {throw new Error("id is of wrong type");}
        id = id.trim();
        if (id.length == 0) {throw new Error("id is not a valid string");}
        //first get data from getCompanies
        try {
        let data = await getCompanies();
        //helper function
        let isCompany = (company) => {return company.id==id;}
        let company = data.find(isCompany);
        if (company==undefined) {throw new Error("company not found");}
        return company;
        } catch (e) {throw e;}
};

export {getCompanies, listEmployees, sameIndustry, getCompanyById};
