export const questionOne = (arr) => {
  //Below is function to calculate factorial of a number
  let getFactorial = (num) => {
    let i = 1;
    let factorial = 1;
    while (i <= num) {
      factorial *= i;
      i++;
    }
    return factorial;
  };
  let ret_array = [];
  for (let i=0; i<arr.length; i++) {
    ret_array.push(getFactorial(arr[i]));
  }
  return ret_array; //return result
};

export const questionTwo = (arr) => {
  // Below is function to check if a number is prime
  let isPrime = (num) => {
    for (let i=2; i<num; i++) {
      if (num % i == 0) {return false;}
    }
    return true;
  };
  let ret_obj = {};
  if (arr === undefined) {return ret_obj;}
  for (let n=0; n<arr.length; n++) {
    ret_obj[arr[n]] = isPrime(arr[n]);
  }
  return ret_obj; //return result
};

export const questionThree = (str) => {
  let ret_obj = {
    'uppercase': 0,
    'lowercase': 0,
    'numbers': 0,
    'spaces': 0,
    'otherCharacters': 0
  };
  for (let i=0; i<str.length; i++) {
    //using ascii codes to compare characters
    //case 1: str[i] is uppercase
    let c = str[i];
    if (c >= 'A' && c <= 'Z') {
      ret_obj['uppercase'] += 1;
    }
    //case 2: str[i] is lowercase
    else if (c >= 'a' && c <= 'z') {
      ret_obj['lowercase'] += 1;
    }
    //case 3: str[i] is a number
    else if (c >= '0' && c <= '9') {
      ret_obj["numbers"] += 1;
    }
    //case 4: str[i] is a space
    else if (c === ' ') {
      ret_obj["spaces"] += 1;
    }
    //case 5: all above cases failed
    else {
      ret_obj["otherCharacters"] += 1;
    }
  }
  return ret_obj; //return result
};

export const questionFour = (arr) => {
  // Implement question 4 here
  //create 2 sub arrays: one for numbers, the other for strings
  let num_arr = arr.filter((value) => {
    return typeof value === "number";
  });
  let str_arr = arr.filter((value) => {
    return typeof value === "string";
  });
  //now sort each individual array using selection sort
  //first the numbers
  for (let i=0; i<num_arr.length; i++) {
    for (let j=i+1; j<num_arr.length; j++) {
      if (num_arr[i]>num_arr[j]) {
        let temp = num_arr[i];
        num_arr[i] = num_arr[j];
        num_arr[j] = temp;
      }
    }
  }
  //now the strings
  for (let i=0; i<str_arr.length; i++) {
    for (let j=i; j<str_arr.length; j++) {
      if (str_arr[i]>str_arr[j]) {
        let temp = str_arr[i];
        str_arr[i] = str_arr[j];
        str_arr[j] = temp;
      }
    }
  }
  //now return those two combined
  return num_arr.concat(str_arr); //return result
};

//DO NOT FORGET TO UPDATE THE INFORMATION BELOW OR IT WILL BE -2 POINTS PER FIELD THAT IS MISSING.
export const studentInfo = {
  firstName: 'Samara',
  lastName: 'Vassell',
  studentId: '20026451'
};

//Pledge: I pledge my honor that I have abided by the Stevens Honor System - Samara Vassell