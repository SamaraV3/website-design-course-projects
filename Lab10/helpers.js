//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
const exportedMethods = {
firstName(name) {
    if (name==undefined) {throw new Error("all fields must be supplied");}
    if (typeof name!="string") {throw new Error("firstName must be a string");}
    name = name.trim();
    if (/^[a-zA-Z]+$/.test(name)==false) {throw new Error("firstName must contain letters only");}
    if (name.trim().length < 2 || name.trim().length > 20) {
        throw new Error("firstName must be between 2 and 20 characters");
    }
},

lastName(name) {
    if (name==undefined) {throw new Error("all fields must be supplied");}
    if (typeof name!="string") {throw new Error("lastName must be a string");}
    name = name.trim();
    if (/^[a-zA-Z]+$/.test(name)==false) {throw new Error("lastName must contain letters only");}
    if (name.trim().length < 2 || name.trim().length > 20) {
        throw new Error("lastName must be between 2 and 20 characters");
    }
},

userId(id) {
    if (id==undefined) {throw new Error("all fields must be supplied");}
    if (typeof id!="string") {throw new Error("userId must be a string");}
    id = id.trim();
    if (/^[a-zA-Z0-9]+$/.test(id)==false) {throw new Error("userId must contain letters and positive whole numbers only");}
    if (id.trim().length < 5 || id.trim().length > 10) {
        throw new Error("userId must be between 5 and 10 characters");
    }
},
password(word) {
    if (word==undefined) {throw new Error("all fields must be supplied");}
    if (typeof word!="string") {throw new Error("password must be a string");}
    if (word.trim().length < 8) {throw new Error("password must be a minimum of 8 characters");}
    word = word.trim();
    //check if spaces exist in word
    if (/\s/.test(word)) {throw new Error("password cannot include spaces");}
    word = word.trim();
    //check for uppercase letter
    if (/[A-Z]/.test(word)==false) {throw new Error("password must contain at least one uppercase character");}
    //check for number
    if (/[0-9]/.test(word)==false) {throw new Error("password must contain at least one number");}
    //check for special character
    if (/[!@#$%^&*()\-+={}[\]:;"'<>,.?\/|\\]/.test(word)==false) {
        throw new Error("password must contain at least one special character");
    }
},
favoriteQuote(quote) {
    if (quote==undefined) {throw new Error("all fields must be supplied");}
    if (typeof quote!="string") {throw new Error("favoriteQuote must be a string");}
    quote = quote.trim();
    if (quote.trim().length < 20 || quote.trim().length > 255) {
        throw new Error("favoriteQuote must be between 20 and 255 characters");
    }
},
themePreference(pref) {
    if (pref==undefined) {throw new Error("all fields must be supplied");}
    if (typeof pref!="object") {throw new Error("themePreference must be an object");}
    if (Object.keys(pref).length != 2) {throw new Error("themePreference must have only two properties");}
    //make sure its the 2 we need
    if (!pref.hasOwnProperty("backgroundColor")) {throw new Error("themePreference must contain backgroundColor property");}
    if (!pref.hasOwnProperty("fontColor")) {throw new Error("themePreference must contain fontColor property");}

    //check if backgroundColor is a valid hex color code
    if (pref["backgroundColor"] == undefined || typeof pref["backgroundColor"] != "string") {
        throw new Error("backgroundColor must be a valid hex color code");
    }
    pref["backgroundColor"] = pref["backgroundColor"].trim();
    if (pref["backgroundColor"][0] != '#') {throw new Error("backgroundColor must be a valid hex color code");}
    if ( (pref["backgroundColor"].length-1!=3) && (pref["backgroundColor"].length-1!=6)) {
        throw new Error("backgroundColor must be a valid hex color code");
    }
    let temp = pref["backgroundColor"].substring(1);
    if (/[a-fA-F0-9]/.test(temp)==false) {
        throw new Error("backgroundColor must be a valid hex color code");
    }

    //check if fontColor is a valid hex color code
    if (pref["fontColor"] == undefined || typeof pref["fontColor"] != "string") {
        throw new Error("fontColor must be a valid hex color code");
    }
    pref["fontColor"] = pref["fontColor"].trim();
    if (pref["fontColor"][0] != '#') {throw new Error("fontColor must be a valid hex color code");}
    if ( (pref["fontColor"].length-1!=3) && (pref["fontColor"].length-1!=6)) {
        throw new Error("fontColor must be a valid hex color code");
    }
    temp = pref["fontColor"].substring(1);
    if (/[a-fA-F0-9]/.test(temp)==false) {
        throw new Error("fontColor must be a valid hex color code");
    }

    //check that theyre not equal
    if (pref["backgroundColor"].localeCompare(pref["fontColor"])==0) {
        throw new Error("backgroundColor and fontColor cannot be the same");
    }
},
role(role) {
    if (role==undefined) {throw new Error("all fields must be supplied");}
    if (typeof role!="string") {throw new Error("role must be a string");}
    role=role.trim().toLowerCase();
    if (role.localeCompare("superuser")!=0 && role.localeCompare("user")!=0) {
        throw new Error("role must be \"superuser\" or \"user\"");
    }
}

};

export default exportedMethods;