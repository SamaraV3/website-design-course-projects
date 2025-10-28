
export const basicStringCheck = (str) => {
    if (str==undefined) {throw new Error("string is empty");}
    if (typeof str !== "string") {throw new Error("non-string entered");}
    str = str.trim();
    if (str.length == 0) {throw new Error("string length is 0");} 
};