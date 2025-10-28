/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script and the type module property*/
import {arrayStats, mergeCommonElements, numberOfOccurrences} from './arrayUtils.js';
import {camelCase, replaceCharsAtIndexes, compressString} from './stringUtils.js';
import {deepEquality, commonKeysValues, calculateObject} from './objectUtils.js';

//arrayStats Tests

try {
    let result = arrayStats([-1.5, -9.7, 0,6,2,9,4,11,6,-22,8,900.25,-1000]);
    console.log(result); //valid input 1
    console.log("arrayStats passed successfully");
} catch (e) {
    console.log(e.toString());
}

try {
    let result = arrayStats(["0", 1, 2, 3, "4", 5]);
    console.log(result); //invalid input 1
    console.log("arrayStats passed successfully");
} catch (e) {
    console.log(e.toString());
}

//mergeCommonElements Tests
try {
    let result = mergeCommonElements([1,-2,"Gravity Falls", ["Pines Twins", -7], "Gobblewonker"], ["Pines Twins",5,[6, "Gobblewonker"],[-7,"Gravity Falls",[1,[3,-2]]]]);
    console.log(result);//valid input 2
    console.log("mergeCommonElements passed successfully");
} catch (e) {
    console.log(e.toString());
}

try {
    let result = mergeCommonElements(['a', 'b', 'b', []], []);
    console.log(result);//invalid input 2
    console.log("mergeCommonElements passed successfully");
} catch (e) {
    console.log(e.toString());
}

//numberOfOccurances Tests
try {
    let result = numberOfOccurrences([22, "toothless", 5, "hi", 7, 6], [6, "toothless", 22, "hi"], [6, "toothless", 22, "hi"], ["toothless", 22, 3, 6, "hi"]);
    console.log(result);//valid input 3
    console.log("numberOfOccurances passed successfully");
} catch (e) {
    console.log(e.toString());
}

try {
    let result = numberOfOccurrences([22, "toothless", 5, "hi", 7, []], [6, "toothless", 22, "hi"], [6, "toothless", 22, "hi"], ["toothless", 22, 3, 6, "hi"]);
    console.log(result);//invalid input 3
    console.log("numberOfOccurances passed successfully");
} catch (e) {
    console.log(e.toString());
}

//camelCase Tests
try {
    let result = camelCase('Number OF oCcUrReNcEs'); // Returns: "numberOfOccurences"
    console.log(result);//valid input 4
    console.log("camelCase passed successfully");
} catch (e) {
    console.log(e.toString());
}

try {
    let result = camelCase('');
    console.log(result);//invalid input 4
    console.log("camelCase passed successfully");
} catch (e) {
    console.log(e.toString());
}

//replaceCharsAtIndexes Tests
try {
    let result = replaceCharsAtIndexes("tacocattacocattacocat", [1, 2, 3, 7, 8, 9]);
    console.log(result);//valid input 5
    console.log("replaceCharsAtIndexes passed successfully");
} catch (e) {
    console.log(e.toString());
}

try {
    let result = replaceCharsAtIndexes("taco cat", [-1, 0, 1, 2, 3]);
    console.log(result);//invalid input 5
    console.log("replaceCharsAtIndexes passed successfully");
} catch (e) {
    console.log(e.toString());
}

//compressString Tests
try {
    let result = compressString("Frosted Flakes, They're Grrrrreeeeeaaaaatt!");
    console.log(result);//valid input 6
    console.log("compressString passed successfully");
} catch (e) {
    console.log(e.toString());
}

try {
    let result = compressString([]);
    console.log(result);//invalid input 6
    console.log("compressString passed successfully");
} catch (e) {
    console.log(e.toString());
}


//deepEquality Tests
let first = {a: "Where", b: ["is", 2, 3], c: {d: "your", f: "boy"}};
let second = {b: ["is", 2, 3], c: {f: "boy", d: "your"}, a: "Where"};
let third = {a: "How is", c: {d: "your", f: "boy"}, b: ["is", 2, 3]};

try {
    let result = deepEquality(first, second);
    console.log(result);//valid input 7
    console.log("deepEquality passed successfully");
} catch (e) {
    console.log(e.toString());
}

try {
    let result = deepEquality(['a', 'b', 'c', 'd'], second);
    console.log(result);//invalid input 7
    console.log("deepEquality passed successfully");
} catch (e) {
    console.log(e.toString());
}



//commonKeysValues Tests
try {
    let result = commonKeysValues(first, third);
    console.log(result);//valid input 8
    console.log("commonKeysValues passed successfully");
} catch (e) {
    console.log(e.toString());
}

try {
    let result = commonKeysValues(first);
    console.log(result);//invalid input 8
    console.log("commonKeysValues passed successfully");
} catch (e) {
    console.log(e.toString());
}

try{
    let result = calculateObject({ a: -9, b: -4, c: 0, d: 1, e: 4, f:16 }, n => Math.abs(n));
    console.log(result);//valid input 9
    console.log("calculateObject passed successfully");
} catch (e) {
    console.log(e.toString());
}


try{
    let result = calculateObject({ a: -16, b: -4, c: 0, d: 1, e: 4, f:16 }, n => n + 10);
    console.log(result);//invalid input 9
    console.log("calculateObject passed successfully");
} catch (e) {
    console.log(e.toString());
}