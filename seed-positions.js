function generateSeed() {
  const date = new Date();
  const dateseedstring =
    date.getDate() + (date.getMonth() + 1) + date.getFullYear();
  dateseed = parseInt(dateseedstring);
  console.log("The dateseed is: " + dateseed);
  return dateseed;
}

function generateGameParameters(seed) {
    seededPRNG = aleaPRNG(seed);
 console.log("Number of pieces is: "+seededPRNG.range(2,5));
 console.log("Number of pieces is: "+seededPRNG.range(2,5));
 console.log("Number of pieces is: "+seededPRNG.range(2,5));
 console.log("Number of pieces is: "+seededPRNG.range(2,5));
 console.log("Number of pieces is: "+seededPRNG.range(2,5));
 console.log("Number of pieces is: "+seededPRNG.range(2,5));
 console.log("Number of pieces is: "+seededPRNG.range(2,5));
 console.log("Number of pieces is: "+seededPRNG.range(2,5));
 console.log("Number of pieces is: "+seededPRNG.range(2,5));
 console.log("Number of pieces is: "+seededPRNG.range(2,5));
 console.log("Number of pieces is: "+seededPRNG.range(2,5));
 

}


