/*
Using client-side JavaScript only (/public/js/form_process.js), you will add an event listener and then listen for the form's submit event; when the form is submitted, you will:

1. Prevent the default behavior of the form.

2. Get the value of the input text element.  
    You should be expecting a variable number of arrays typed into the input separated by commas:  For example: [3, 0, 1, 2, 4], [1, 2, 8, 15], [6, 3, 10, 25, 29]

    All array elements should be whole numbers (negative and 0 are allowed), no decimals. If any of the elements in any of the arrays is not a whole number, you will display an error on the page in the paragraph element that has the id of "error"

    Each array should have at least one element that is a whole number (negative and 0 are allowed), no decimals. (so no empty arrays)

    You can ignore any extra commas between array inputs for example, inputting: [3, 0, 1, 2, 4],, [1, 2, 8, 15], [6, 3, 10, 25, 29], 

    There should be at least one array inputted. 

    If there is/are empty element(s) in the ANY of the arrays that were inputted, you must display an error and not continue.  For example, inputting: [3, 0, 1, , 4], [1, 2, 8, 15] [6, 3, 10, 25, 29]

3. You will then return a single array that has all the values from the arrays inputted sorted from lowest to highest number with no duplicates (so unique elements).  For example:  If our input was: [3, 0, 1, 2, 4], [1, 2, 8, 15], [6, 3, 10, 25, 29] You would return:  [0, 1, 2, 3, 4, 6, 8, 10, 15, 25, 29]

4. Add a list item to the #input_sorted list of result of the sort you have just completed. You will alternate the class for each list item using the classes is-odd and is-even (described below), starting with is-odd first.


If the user does not have a value for the input when they submit, you should not continue processing and instead should inform them of an error somehow or if they enter anything besides an single array or a list of arrays.

Do not forget to hide the error paragraph if the input was valid.  So for example, if I enter in input that is invalid, the application will how the error paragraph with text explaining the issue; for example "Input cannot just be spaces!".  Then if I re-input the input, but this time it was valid, the error paragraph should get hidden. (look at the Simple Dom Example from Lecture 8's lecture code to see an example of that)

YOU MUST USE THE SAME EXACT NAME/ID ATTRIBUTES AS STATED IN THE ASSIGNMENT, THE GRADING SCRIPT WILL BE LOOKING FOR THESE ELEMENTS BY ID AND NAME SO IF YOU DO NOT NAME THEM EXACTLY WHAT IS STATED, YOU WILL GET THE POINTS OFF FOR IT. 

You can use either the DOM API or jQuery (or a mix of both) for the assignment. 


*/

//the below validates the input
function validateAndParseInput (input) {
    let newStr = '';
    let arrayEnded = false;
    let commaFound = true;//represents comma seperating different arrays, NOT the same one
    let retArr = [];
    //check if input is empty
    if (input==undefined || input.trim().length<=2) {throw new Error("input is empty");}
    input = input.trim();
    //check if first element is [
    if (input[0] != '[') {throw new Error("input must start with '['");}
    for (let i=1; i<input.length; i++) {
        let currChar = input[i];
        if (arrayEnded==false && (/\d/.test(currChar) || currChar == "," || currChar == '-')) {
            //since array hasnt ended we add it to array if it is a digit or comma
            newStr += currChar;
        }
        else if (currChar == ' ') {continue;} //if its a space j continue
        else if (arrayEnded==false && currChar==']') {
            //we've reached the end of the array!
            arrayEnded = true; commaFound = false;
            let arr_vals = newStr.split(",");
            retArr.push(arr_vals);
            newStr = "";
        }
        else if (arrayEnded==true && currChar==",") {
            //found a comma so...
            commaFound = true;
        }
        else if (arrayEnded==true && commaFound==true && currChar=="[") {
            //restart le process by setting commaFound=false and arrayEnded=false
            arrayEnded = false; commaFound = false;
        }
        else {
            //now we get to figure out WHY we have an error. fun :/
            //possibility one: found a '[' while arrayEnded = false
            //either one within an array or there was no comma seperating 2 arrays
            if (currChar=='[') {throw new Error("'[' found before the expected ']' or ','");}
            //possibility 2: we got a character OR float
            if (/[a-zA-Z]/.test(currChar) && arrayEnded==false) {throw new Error("all values in lists must be numbers");}
            if (currChar=='.' && arrayEnded==false) {throw new Error("all values in lists must be WHOLE numbers");}
            if (currChar==']') {throw new Error("extra ']' found at position "+i);}
            else {throw new Error("all values must be lists");}
        }
    }
    return retArr;
}


let form = document.getElementById("arraySortForm");
let ol = document.getElementById("input_sorted");
let errorP = document.getElementById("error");
let numVals = 0

if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log("form has been submitted");
        let arrs = document.getElementById("array_input").value;
        errorP.hidden = true;
        try {
            arrs = validateAndParseInput(arrs);
        } catch (e) {
            errorP.innerHTML = e.toString();
            errorP.hidden = false;
            return 0;
        }
        const mySet = new Set();//will be my way of getting rid of duplicates
        //now iterate over each sub array in arrs
        for (let i=0; i<arrs.length; i++) {
            //and every element in the subarray
            for (let j=0; j<arrs[i].length; j++) {
                //if an element if empty then throw an error
                if (arrs[i][j]=='') {
                    errorP.innerHTML = "One of the array elements is empty";
                    errorP.hidden = false;
                    return 0;
                }
                //otherwise save it as a number
                else {mySet.add(parseInt(arrs[i][j]));}
            }
        }
        arrs = [...mySet];
        arrs.sort((a,b) => a-b);//sort arrs
        //now add it as an li
        let li = document.createElement("li");
        li.innerHTML = "[" + arrs.join(', ') + "]";
        if (numVals % 2 == 0) {li.className = "is_even";}
        else {li.className = "is_odd";}
        numVals++;
        ol.appendChild(li);
    });
}
