/* Todo: Implment the functions below and then export them
      using ES6 syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let camelCase = (str) => {
  //Check 1: That the string exist
  if (str==undefined) {throw new Error("No string inputted");}
  //Check 1.5: That there's only 1 argument supplied
  if ([str].length>1) {throw new Error("Only one argument allowed");}
  //Check 2: The string is of the proper type
  if (typeof str != "string") {throw new Error("Input must be of type string");}
  str = str.trim();//removes whitespace from front and back if applicable
  //Check 3: The length of the string is greater than 0
  if (str.length == 0) {throw new Error("String length must be greater than 0");}

  //first convert every char to lowercase
  str = str.toLowerCase();
  let finalStr = str.charAt(0);
  //now every character AFTER a space will be converted to uppercase
  for (let i=1; i<str.length; i++) {
      if (str[i] == ' ') {
            //check if its within bounds
            if ((i+1)==str.length) {finalStr += str.charAt(i);}
            else {
                  finalStr += str.charAt(i+1).toUpperCase();
                  i++;
            }
      }
      else {finalStr += str.charAt(i);}
  }
  return finalStr;
};

let replaceCharsAtIndexes = (str, idxArr) => {
      //Check 0: Ensure only 2 arguments were supplied
      if ([str, idxArr].length!= 2) {throw new Error("Only 2 arguments must be supplied");}
      //Check 1: Ensure the string exists and has a length greater than 0.
      if (str==undefined || str.length == 0) {throw new Error("String input does not exist");}
      //Check 2: Ensure the string is of the proper type.
      if (typeof str != 'string') {throw new Error("First input must be of type string");}
      //Check 3: Ensure the string is not just empty spaces.
      if (str.trim().length==0) {throw new Error("String only contains empty spaces");}
      //Check 4: Ensure idxArr is an array of integers.
      if (!Array.isArray(idxArr) || !idxArr.every(Number.isInteger) ) {throw new Error("idxArray must be an array of integers");}
      let n = str.length;
      //Check 5: Ensure that each index in idxArr is valid within the string.
      if (!idxArr.every((elem) => elem > 0 && elem <= n-2) ) {throw new Error("idxArray must include only valid indices");}

      //change str to an array for ease
      str = str.split("");
      //iterate over all elements of idxArray
      for (let i=0; i<idxArr.length; i++) {
            //get char we need to replace
            let replChar = str[idxArr[i]];
            //and what we need to replace it with
            let newChars = [str[idxArr[i]-1], str[idxArr[i]+1]];
            //now iterate over str starting at i+1. if str[i] == replChar then replace it
            let num = 0;
            for (let j=idxArr[i]+1; j<str.length; j++) {
                  if (str[j]==replChar) {
                        str[j] = newChars[num];
                        num = (num + 1) % 2;
                  }
            }
      }

      return str.join("");
};

let compressString = (str) => {
      //Check 1: Ensure the string exists and has a length greater than 0.
      if (str==undefined || str.length == 0) {throw new Error("String input does not exist");}
      //Check 2: Ensure the string is of the proper type.
      if (typeof str != 'string') {throw new Error("First input must be of type string");}
      //Check 3: Ensure the string is not just empty spaces.
      if (str.trim().length==0) {throw new Error("String only contains empty spaces");}

      let i=0;
      let final_str = "";
      while (i<str.length) {
            let currChar = str.charAt(i);
            let charCount = 0;
            //find num of consec chars
            while (i<str.length&&str.charAt(i)==currChar) {
                  charCount++;
                  i++;
            }
            //check the number of chars
            if (charCount > 1) {final_str += currChar + charCount}
            else {final_str += currChar;}
      }
      return final_str;
};

export {camelCase, replaceCharsAtIndexes, compressString};
