/* Todo: Implment the functions below and then export them
      using ES6 syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let arrayStats = (array) => {
  //Check 1: Check if array exists
  if (array==undefined) {throw new Error("No input found");}
  //Check 2: Check type is array
  if (!Array.isArray(array)) {throw new Error("Non-array type inputted");}
  //Check 3: Check if array is empty
  if (array.length==0) {throw new Error("Array is Empty");}
  //Check 3.5: Check if there is more than 1 param supplied
  //if ([array].length > 1) {throw new Error("More than one parameter supplied");}
  //Check 4: Check if array has only numeric values
  if (!array.every(val => Number.isFinite(val) && !Number.isNaN(val))) {throw new Error("Array contains non-numerical values");}
  
  //First sort array using numeric values
  array.sort((a, b) => a - b);
  //get sum of array
  let sum = 0;
  for (let i=0; i<array.length; i++) {
    sum += array[i];
  }
  //get median of array
  let median = (array.length%2==1) ? array[(array.length-1)/2] : (array[array.length / 2 - 1] + array[array.length / 2]) / 2;

  //get mode of array
  let frequencies = {};
  //add values to frequencies
  for (let i=0; i<array.length; i++) {
    if (array[i] in frequencies) {
      frequencies[array[i]]++;
    }
    else {
      frequencies[array[i]] = 1
    }
  }
  let modes = [];
  let maxFreq = 0;
  //actually get modes
  for (const key in frequencies) {
    if (frequencies[key]>maxFreq) {
      maxFreq = frequencies[key];
      modes = [key]
    }
    else if (frequencies[key]==maxFreq) {
      modes.push(key)
    }
  }
  modes = modes.map(str => Number(str));
  modes.sort((a, b) => a - b);
  //now check if every item is a mode OR if only 1 item is a mode
  if (modes.length * maxFreq == array.length) {modes = 0;}
  else if (modes.length == 1) {modes = modes[0];}
  //now get object to return
  let ret_obj = {
    'mean': sum/array.length,
    'median': median,
    'mode': modes,
    'range': array[array.length-1]-array[0],
    'minimum': array[0],
    'maximum': array[array.length-1],
    'count': array.length,
    'sum': sum
  }
  return ret_obj;
};

let mergeCommonElements = (...arrays) => {
  //Check 1: At least TWO arrays are supplied as input
  if (arrays.length < 2) {throw new Error("2 or more array inputs required");}
  //Check 2: all inputs are of type array
  if (!arrays.every(Array.isArray)) {throw new Error("All inputs must be arrays");}
  //now flatten each element of arrays
  for (let i=0; i<arrays.length; i++) {
    arrays[i] = arrays[i].flat(Infinity);
  }
  //Check 3: every input is non empty
  if (!arrays.every(subArr => subArr.length > 0)) {throw new Error("All inputs must be non-empty");}
  //Check 4: every array element is a Number or String type
  for (let i=0; i<arrays.length; i++) {
    for (let j=0; j<arrays[i].length; j++) {
      if ((typeof arrays[i][j] != "number") && (typeof arrays[i][j] != "string") && !isNaN(arrays[i][j])) {
        throw new Error("All array elements must be numbers or strings");
      }
    }
  }
  //Now iterate over the first element of arrays, checking if every item in that subarray is in the other ones
  let subArray = arrays[0];
  let commonElements = [];
  for (let i=0; i<subArray.length; i++) {
    if (arrays.every(arr => arr.includes(subArray[i]))) {commonElements.push(subArray[i]);}
  }
  //get rid of duplicates from commonElements
  commonElements = [... new Set(commonElements)];
  //get numbers vs strings in different lists and sort them accordingly
  let numElements = commonElements.filter(a => typeof a == "number").sort((a, b) => a - b);
  let strElements = commonElements.filter(a => typeof a == "string").sort();
  //now concatenate
  return numElements.concat(strElements);
};

let numberOfOccurrences = (...arrays) => {
  //Check 1: At least TWO arrays are supplied as input
  if (arrays.length < 2) {throw new Error("2 or more array inputs required");}
  //Check 2: all inputs are of type array
  if (!arrays.every(Array.isArray)) {throw new Error("All inputs must be arrays");}
  //Check 3: every input is non empty
  if (!arrays.every(subArr => subArr.length > 0)) {throw new Error("All inputs must be non-empty");}
  //Check 4: every array element is a Number or String type
  for (let i=0; i<arrays.length; i++) {
    for (let j=0; j<arrays[i].length; j++) {
      if ((typeof arrays[i][j] != "number") && (typeof arrays[i][j] != "string") && !isNaN(arrays[i][j])) {
        throw new Error("All array elements must be numbers or strings");
      }
    }
  }
  let num_occurances = {};
  //Now iterate over each array and each item
  for (let i=0; i<arrays.length; i++) {
    for (let j=0; j<arrays[i].length; j++) {
      if (arrays[i][j] in num_occurances) {
        num_occurances[arrays[i][j]]++;
      }
      else {
        if (typeof arrays[i][j] == 'number') {num_occurances[arrays[i][j]] = 1;}
        else {
          //check if string only contains characters
          //below is true if there is a non letter in the string
          if (!/^[a-zA-Z]+$/.test(arrays[i][j])) {throw new Error("Strings can only contain characters/letters");}
          num_occurances[arrays[i][j]] = 1;
        }
      }
    }
  }
  return num_occurances;
};

export {arrayStats, mergeCommonElements, numberOfOccurrences};