//Enumerated values for piece types
// king = 1;
// queen = 2;
// rook = 3;
// bishop = 4;
// knight = 5; //optional implementation

//Seed 3434398 is a real spicy one
function generateSeed() {
  const date = new Date();
  const dateseedstring =
  "" + date.getDate() + (date.getMonth() + 1) + date.getFullYear();
  dateseed = parseInt(dateseedstring);
  console.log("The dateseed is: " + dateseed);
  return dateseed+18926;
}

function generateGameParameters(seed) {
  seededPRNG = aleaPRNG(seed);
  var num_pieces = seededPRNG.range(2, 5);
  console.log("Number of pieces is: " + num_pieces);
  var pieceArray = new Array(num_pieces);

  for (var i = 0; i < num_pieces; i++) {
    pieceArray[i] = new Array(2);
    pieceArray[i][0] = seededPRNG.range(1, 4);

    //While the proposed location of piece i matches the set location of any of the preceding pieces, re-randomise piece i's location
    var duplicateStatus = 1;
    while (duplicateStatus == 1) {
      pieceArray[i][1] = seededPRNG.range(0, ROWNUM*COLUMNNUM-1);
      duplicateStatus = 0;
      for (var j = 0; j < i; j++) {
        if (pieceArray[i][1] == pieceArray[j][1]) {
          duplicateStatus = 1;
        }
      }

      //Used for testing
      // for (var k = 0; k < i; k++) {
      //   console.log("The "+k+"th piece has type-location array of: " + pieceArray[k]);
      // }
    }
  }
  return pieceArray;
}


