/* Todo: Implment the functions below and then export them
      using ES6 syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let deepEquality = (obj1, obj2) => {
      //Check 1: obj1 and obj2 are defined 
      if ((obj1==undefined)||(obj2==undefined)) {throw new Error("Both objects must be defined");}
      //Check 2: obj1 and obj2 are of type object
      if ((typeof obj1 != 'object')||(typeof obj2 != "object")) {throw new Error("Both inputs must be objects");}
      //Check 2.5: neither is an array
      if (Array.isArray(obj1) || Array.isArray(obj2)) {throw new Error("Both inputs must be objects");}
      //helper function --> checks if smthn is an object but NOT an array
      //since for those we wanna compare each element differently
      let isObject = (object) => {
            return (object != null) && (typeof object === "object") && !Array.isArray(object);
          };
      let deepEqualityRecursive = (obj1, obj2) => {
      //get the keys from both obj1 and obj2
      let obj1Keys = Object.keys(obj1);
      let obj2Keys = Object.keys(obj2);
      //if they have a dif number of keys return false
      if (obj1Keys.length != obj2Keys.length) {return false;}

      //iterate over each key in obj1
      for (let key of obj1Keys) {
            //first check if key exists in obj2Keys.
            if (!obj2.hasOwnProperty(key)) {return false;}
            //otherwise get the values at those keys
            let val1 = obj1[key];
            let val2 = obj2[key];
            //they can either be objects (not arrays), in which case we run deepEquality again, or non objects (in which case we dont)
            if (isObject(val1) && isObject(val2)) {
                  //if deepEquality says theyre not equal return false
                  if (!deepEqualityRecursive(val1, val2)) {return false;}
            }
            //if one is an object while the other isnt they cannot be equal
            else if (isObject(val1) || isObject(val2)) {return false;}
            else {
                  //one more check: if theyre both arrays then compare using .every
                  if (Array.isArray(val1) && Array.isArray(val2)) {
                        //flatten them both
                        val1 = val1.flat(Infinity);
                        val2 = val2.flat(Infinity);
                        //then use .every to see if each element is equal
                        if (!val1.every((val, i) => val == val2[i])) {return false;}
                  }
                  //if only one is an array return false
                  else if (Array.isArray(val1) || Array.isArray(val2)) {return false;}
                  else if (val1 != val2) {return false;}
            }
      }
      return true;//occurs if theyre equal
      }
      return deepEqualityRecursive(obj1, obj2);
};

let commonKeysValues = (obj1, obj2) => {
      //Check 1: obj1 and obj2 are defined 
      if ((obj1==undefined)||(obj2==undefined)) {throw new Error("Both objects must be defined");}
      //Check 2: obj1 and obj2 are of type object
      if ((typeof obj1 != 'object')||(typeof obj2 != "object")) {throw new Error("Both inputs must be objects");}
      //Check 2.5: neither is an array
      if (Array.isArray(obj1) || Array.isArray(obj2)) {throw new Error("Both inputs must be objects");}
      //helper function --> checks if smthn is an object but NOT an array
      let isObject = (object) => {
            return (object != null) && (typeof object === "object") && !Array.isArray(object);
          };
      let commonPairs = {};
      let commonKeysValuesRecursive = (obj1, obj2) => {
            
            //get the keys from both obj1 and obj2
            let obj1Keys = Object.keys(obj1);
            //let obj2Keys = Object.keys(obj2);
            //iterate over all keys in obj1
            for (let key of obj1Keys) {
                  //first check if key exists in obj2Keys. If not go to next iteration of for loop
                  if (!obj2.hasOwnProperty(key)) {continue;}
                  //otherwise get the values at those keys
                  let val1 = obj1[key];
                  let val2 = obj2[key];
                  //case 1: theyre both objects but NOT arrays
                  if (isObject(val1) && isObject(val2)) {
                        //if theyre deeply equal then add them to commonPairs
                        if (deepEquality(val1,val2)) {console.log('');commonPairs[key]=val1;}
                        //Regardless call commonKeysValuesRecursive on them and add each elem in
                        //nestedCommonPairs to commonPairs
                        let nestedCommonPairs = commonKeysValuesRecursive(val1, val2);

                        // if there are some in common then we add them to commonPairs
                        if (Object.keys(nestedCommonPairs).length > 0) {
                              for (let key2 of Object.keys(nestedCommonPairs)) {commonPairs[key2] = nestedCommonPairs[key2];}
                        }
                  }
                  //if one is an object while the other isnt they cannot be equal so just continue
                  else if (isObject(val1) || isObject(val2)) {continue;}
                  //one more check: if theyre both arrays then compare using .every
                  if (Array.isArray(val1) && Array.isArray(val2)) {
                        //flatten them both
                        val1 = val1.flat(Infinity);
                        val2 = val2.flat(Infinity);
                        //then use .every to see if each element is equal
                        //if they are add this to commonPairs
                        if (val1.every((val, i) => val == val2[i])) {
                              commonPairs[key] = val1;
                        }
                  }
                  //if only one is an array continue
                  else if (Array.isArray(val1) || Array.isArray(val2)) {continue;}
                  else {
                        if (val1 == val2) {commonPairs[key]=val1;}
                  }
            }
            return commonPairs;//occurs if theyre equal
      };
      return commonKeysValuesRecursive(obj1, obj2);
};

let calculateObject = (object, func) => {
      //Check 1: object is type object AND exists
      if (object==undefined || typeof object != "object" || Array.isArray(object)) {throw new Error("Object does not exist");}
      //Check 2: func is type function AND exists
      if (func==undefined || typeof func != "function") {throw new Error("Function does not exist");}

      //iterate over every element in object
      let objKeys = Object.keys(object);
      for (let k of objKeys) {
            //get element of keys
            let elem = object[k];
            //Check 3: element is a positive, negative or decimal number
            if (!Number.isFinite(elem)) {throw new Error("All elements must be positive, negative or decimal numbers");}
            //getting here implies the element IS valid. Run func on it
            let res = Math.sqrt(func(elem));
            //check if res is NaN and if so throw an error
            if (Number.isNaN(res)) {throw new Error("Invalid Result");}
            //getting here implies res is not NaN so change val at object[k]
            object[k] = Number(res.toFixed(2));
      }
      return object;
};

export {deepEquality, commonKeysValues, calculateObject};