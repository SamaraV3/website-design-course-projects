import * as lab1 from './lab1.mjs';

//TODO: Write and call each function in lab1.js 5 times each, passing in different input

//For Question One

console.log(lab1.questionOne([2, 4, 6])); // returns and then outputs: [2, 24, 720]

console.log(lab1.questionOne([3,5,7])); // returns and then outputs: [6, 120, 5040] 

console.log(lab1.questionOne([1])); // returns and then outputs: [1]

console.log(lab1.questionOne([0, 1, 5])); // returns and then outputs: [1, 1, 120]

console.log(lab1.questionOne([6, 10, 11, 12])); // returns and then outputs: [720, 3628800, 39916800, 479001600]

//For Question Two
console.log(lab1.questionTwo([1, 2, 3])); 
// returns and then outputs: {1:true, 2: true, 3: true} 

console.log(lab1.questionTwo([4])); 
// returns and then outputs: {4: false} 

console.log(lab1.questionTwo([5, 6, 7])); 
// returns and then outputs: {5: true, 6: false, 7: true}

console.log(lab1.questionTwo([467, 667, 10, 101])); 
// returns and then outputs: {46: true, 667: true, 10: false, 101: true}

console.log(lab1.questionTwo([])); 
// returns and then outputs: {}

console.log(lab1.questionTwo()); 
// returns and then outputs: {}

// For Question Three
console.log(lab1.questionThree("Come and Get It! Hello, We're Got7!")); // returns and then outputs: {uppercase: 6, lowercase: 18, numbers: 1, spaces: 6, otherCharacters: 4}
console.log(lab1.questionThree("1N2D")); // returns and then outputs {uppercase: 2, lowercase: 0, numbers: 2, spaces: 0, otherCharacters: 0}
console.log(lab1.questionThree("")); // returns and then outputs {uppercase: 0, lowercase: 0, numbers: 0, spaces: 0, otherCharacters: 0}
console.log(lab1.questionThree("    . ")); // returns and then outputs {uppercase: 0, lowercase: 0, numbers: 0, spaces: 5, otherCharacters: 1}
console.log(lab1.questionThree("D1 be the One! We're ZeroBaseOne!"));
//returns and then outputs {uppercase: 6, lowercase: 18, numbers: 1, spaces: 5, otherCharacters: 3}

// For Question Four
console.log(lab1.questionFour([7, "get", 6, "a", 5, "guitar"])); //would return and then output [5, 6, 7, "a", "get", "guitar"]
console.log(lab1.questionFour([25, "Samara", 20, "Vassell", 58])); //would return and then output [20, 25, 58, "Samara", "Vassell"]
console.log(lab1.questionFour([-50, "Siren", 90000, "Boom Bass"])); //would return and then output [-50, 90000, "Boom Bass", "Siren"]
console.log(lab1.questionFour([])) //should return []
//would return and then output [-27, -23, -21, -20, 19, 21, 23, 24, 25, 'Gunwook', 'Gyuvin', 'Hanbin', 'Hao', 'Jiwoong', 'Matthew', 'Ricky', 'Taerae', 'Yujin']
console.log(lab1.questionFour(["Hanbin", 24, "Jiwoong", -27, "Hao", 25, "Matthew", -23, "Taerae", 23, "Ricky", -21, "Gyuvin", 21, "Gunwook", -20, "Yujin", 19]))