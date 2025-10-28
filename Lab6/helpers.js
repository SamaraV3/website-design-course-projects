//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.

const exportedMethods = {
checkTitle(title) {
    if (typeof title != 'string' || title.trim().length < 2) {throw new Error("title must be at least two characters");}
    if (!/^[A-Za-z0-9\s]*$/.test(title)) {throw new Error("title can contain letters a-z, A-Z or numbers");}
    return 0;
},

checkStudio(studio) {
    //is string and trim is a length of at least 5
    if (typeof studio != 'string' || studio.trim().length < 5) {throw new Error("studio must be at least 5 characters");}
    if (!/^[A-Za-z\s]*$/.test(studio)) {throw new Error("studio can contain letters a-z and A-Z");}
},

checkDirector(director) {
    if (typeof director != 'string' || director.trim().length <= 0) {throw new Error("director must be a non empty string");}
    director = director.trim();
    let temp_director = director.split(" ");//sets director to a list
    //if length of director != 2 (for first and last name) OR first/last name are less than 3 characters throw error
    if (temp_director.length != 2 || temp_director[0].length < 3 || temp_director[1].length < 3) {throw new Error("director must have the following format \"first name space last name\" where first name and last name are at least 3 characters")}
    //now ensure there's only letters in both part
    if (!/^[A-Za-z\s]*$/.test(temp_director[0]) || !/^[A-Za-z\s]*$/.test(temp_director[1])) {throw new Error("first and last names must contain only letters a-z and A-Z");}
},

checkRating(rating) {
    if (typeof rating != 'string' || rating.trim().length <= 0) {throw new Error("rating must be a non empty string");}
    rating = rating.trim();
    if ((rating != 'G') && (rating != "PG") && (rating != "PG-13") && (rating != "R") && (rating != "NC-17")) {throw new Error("rating is not a valid value");}
},

checkGenres(genres) {
    if (!Array.isArray(genres)) {throw new Error("genres must be of type array");}
    if (genres.length < 1) {throw new Error("genres must be an array with at least one element");}
    if (!genres.every(g => typeof g == "string")) {throw new Error("all items in genres must be of type string")}
    if (!genres.every(g => g.trim().length >= 5)) {throw new Error("all items in genres must be at least 5 characters long");}
    genres = genres.map(g => g.trim());
    if (!genres.every(g => /^[A-Za-z\s]*$/.test(g))) {throw new Error("all items in genres must only contain letters a-z or A-Z");}
},

checkCastMembers(castMembers) {
    if (!Array.isArray(castMembers)) {throw new Error("castMembers must be of type array");}
    if (castMembers.length < 1) {throw new Error("castMembers must be an array with at least one element");}
    if (!castMembers.every(cm => typeof cm == "string")) {throw new Error("all items in castMembers must be of type string")}
    if (!castMembers.every(cm => cm.trim().length > 0)) {throw new Error("all items in castMembers must not be empty");}
    castMembers = castMembers.map(cm => cm.trim());
    if (!castMembers.every(cm => /^[A-Za-z\s]*$/.test(cm))) {throw new Error("all items in castMembers must only contain letters a-z or A-Z");}
    let temp_cm = castMembers.map(cm => cm.split(" "));
    //check if every val in temp_cm is = length 2
    if (!temp_cm.every(val => val.length == 2)) {throw new Error("every castMember must have the following format \"first name space last name\"");}
    //check if all first and last names are at least 3 characters long
    if (!temp_cm.every(val => val[0].length >= 3 && val[1].length >= 3)) {throw new Error("every castMember must have a first and last name of at least 3 characters each");}
    
},

checkDateReleased(dateReleased) {
    if (typeof dateReleased != 'string' || dateReleased.trim().length <= 0) {throw new Error("dateReleased must be a non empty string");}
    dateReleased = dateReleased.trim();
    //check its format: mm/dd/yyyy"
    let regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    if (!regex.test(dateReleased)) {throw new Error("dateReleased must be a valid date in the following format: mm/dd/yyyy");}
    //check if its a VALID date
    //apparently Date() automatically fixes incorrect dates so we gonna do this
    let origDates = dateReleased.split("/").map(Number);//convert month [0], day [1], year [2] to numbers
    let convertedDate = new Date(origDates[2], origDates[0]-1, origDates[1]);//convert them to Data structure
    
    if ((convertedDate.getDate()!=origDates[1]) || (convertedDate.getMonth()!=origDates[0]-1) || (convertedDate.getFullYear()!=origDates[2])) {throw new Error("dateReleased must be a valid date");}
    //check if date is between smallest and largest dates
    let smallestDate = new Date('01/01/1900');
    let largestDate = new Date();
    if ((convertedDate.getFullYear() < smallestDate.getFullYear()) || (convertedDate.getFullYear() > largestDate.getFullYear()+2)) {
      throw new Error(`Only years between 1900 and ${largestDate.getFullYear() + 2} are allowed`);
    }
},

checkRuntime(runtime) {
    if (typeof runtime != 'string' || runtime.trim().length <= 0) {throw new Error("runtime must be a non empty string");}
    runtime = runtime.trim();
    let regex = /^(0|[1-9]\d*)h (0|[1-5]?\d)min$/;
    if (!regex.test(runtime)) {throw new Error("runtime must be a valid value in the following format: #h #min");}
    let rTemp = runtime.split(" ");
    rTemp[0] = Number(rTemp[0].replace("h","")); rTemp[1] = Number(rTemp[1].replace("min",""));
    //final check: movie is at least 31 minutes
    if (rTemp[0]==0 && rTemp[1]<31) {throw new Error("runtime must be at least 31 minutes");}
},

checkPlot(plot) {
    if (typeof plot != 'string' || plot.trim().length <= 0) {throw new Error("plot must be a non empty string");}
},

checkReviewTitle(reviewTitle) {
    if (reviewTitle==undefined) {throw new Error("reviewTitle is undefined");}
    if (typeof reviewTitle != "string" || reviewTitle.trim().length <= 0) {throw new Error("reviewTitle must be a non empty string");}
},
checkReviewerName(reviewerName) {
    if (reviewerName==undefined) {throw new Error("reviewerName is undefined");}
    if (typeof reviewerName != "string" || reviewerName.trim().length <= 0) {throw new Error("reviewerName must be a non empty string");}
},
checkReview(review) {
    if (review==undefined) {throw new Error("review is undefined");}
    if (typeof review != "string" || review.trim().length <= 0) {throw new Error("review must be a non empty string");}
},
checkReviewRating(rating) {
    if (rating==undefined) {throw new Error("rating is undefined");}
    if (typeof rating != "number" || rating < 1 || rating > 5) {throw new Error("rating must be a number from 1 to 5 inclusive");}
}

};

export default exportedMethods;