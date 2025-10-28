// In this file, you must perform all client-side validation for every single form input (and the role dropdown) on your pages. The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. If the form being submitted has all valid data, then you will allow it to submit to the server for processing. Don't forget to check that password and confirm password match on the registration form!

//below is j helpers.js copied here for somplicity
class Validation {
    static firstName(name) {
        if (name==undefined) {throw new Error("all fields must be supplied");}
        if (typeof name!="string") {throw new Error("firstName must be a string");}
        name = name.trim();
        if (/^[a-zA-Z]+$/.test(name)==false) {throw new Error("firstName must contain letters only");}
        if (name.trim().length < 2 || name.trim().length > 20) {
            throw new Error("firstName must be between 2 and 20 characters");
        }
    }
    
    static lastName(name) {
        if (name==undefined) {throw new Error("all fields must be supplied");}
        if (typeof name!="string") {throw new Error("lastName must be a string");}
        name = name.trim();
        if (/^[a-zA-Z]+$/.test(name)==false) {throw new Error("lastName must contain letters only");}
        if (name.trim().length < 2 || name.trim().length > 20) {
            throw new Error("lastName must be between 2 and 20 characters");
        }
    }
    
    static userId(id) {
        if (id==undefined) {throw new Error("all fields must be supplied");}
        if (typeof id!="string") {throw new Error("userId must be a string");}
        id = id.trim();
        if (/^[a-zA-Z0-9]+$/.test(id)==false) {throw new Error("userId must contain letters and positive whole numbers only");}
        if (id.trim().length < 5 || id.trim().length > 10) {
            throw new Error("userId must be between 5 and 10 characters");
        }
    }

    static password(word) {
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
    }

    static favoriteQuote(quote) {
        if (quote==undefined) {throw new Error("all fields must be supplied");}
        if (typeof quote!="string") {throw new Error("favoriteQuote must be a string");}
        quote = quote.trim();
        if (quote.trim().length < 20 || quote.trim().length > 255) {
            throw new Error("favoriteQuote must be between 20 and 255 characters");
        }
    }

    static themePreference(pref) {
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
        if (/^([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/.test(temp)==false) {
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
        if (/^([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/.test(temp)==false) {
            throw new Error("fontColor must be a valid hex color code");
        }
    
        //check that theyre not equal
        if (pref["backgroundColor"].localeCompare(pref["fontColor"])==0) {
            throw new Error("backgroundColor and fontColor cannot be the same");
        }
    }

    static role(role) {
        if (role==undefined) {throw new Error("all fields must be supplied");}
        if (typeof role!="string") {throw new Error("role must be a string");}
        role=role.trim().toLowerCase();
        if (role.localeCompare("superuser")!=0 && role.localeCompare("user")!=0) {
            throw new Error("role must be \"superuser\" or \"user\"");
        }
    }
    
}




let loginForm = document.getElementById("signin-form");
let registerForm = document.getElementById("signup-form");
//let errorP = document.getElementById("error");

//event listener for loginForm

if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
        let userId = document.getElementById("userId").value;
        let password = document.getElementById("password").value;
        try {
            Validation.userId(userId);
            Validation.password(password);
            console.log("Form submitted successfully!");
        }
        catch (e) {
            event.preventDefault();
            //check if error paragraph exists
            let errorP = document.getElementById("error");
            if (!errorP) {
                errorP = document.createElement("p");
                errorP.classList.add("error"); errorP.id = "error";
                event.target.appendChild(errorP);
            }
            errorP.innerHTML = e.toString().replace("Error: ", "");
        }
    });
}

if (registerForm) {
    registerForm.addEventListener("submit", (event) => {
        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let userId = document.getElementById("userId").value;
        let password = document.getElementById("password").value;
        let confirmPassword = document.getElementById("confirmPassword").value;
        let favoriteQuote = document.getElementById("favoriteQuote").value;
        let backgroundColor = document.getElementById("backgroundColor").value;
        let fontColor = document.getElementById("fontColor").value;
        let role = document.getElementById("role").value;

        try {
            Validation.firstName(firstName);
            Validation.lastName(lastName);
            Validation.userId(userId);
            Validation.password(password);
            Validation.password(confirmPassword);
            Validation.favoriteQuote(favoriteQuote);
            Validation.themePreference({backgroundColor: backgroundColor, fontColor: fontColor});
            Validation.role(role);
            if (password.localeCompare(confirmPassword) != 0) {
                throw new Error("password and confirmPassword must match");
            }
            console.log("Form submitted successfully!");
        }
        catch (e) {
            event.preventDefault();
            //check if error paragraph exists
            let errorP = document.getElementById("error");
            if (!errorP) {
                errorP = document.createElement("p");
                errorP.classList.add("error"); errorP.id = "error";
                event.target.appendChild(errorP);
            }
            errorP.innerHTML = e.toString().replace("Error: ", "");
        }
    });
}
