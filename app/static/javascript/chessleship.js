//Enumerate values for empty, and occupied cells
//If a cell has any other value is is targeted by that number of pieces
const empty = 0;
const occupied = 99;

//Set size of board
const ROWNUM = 8;
const COLUMNNUM = 8;

//Sets the number of guesses allowed per turn as well as number of turns
const NUMGUESSPERTURN = 8;
const NUMTURNS = 8;

const pieceSymbolArray = ["", "K", "Q", "R", "B"];
//For rob to Change to 
var turnCounter = 0;

//GuessCounter counts the number of guesses per turn to ensure limit on number of guesses
var guessCounter = 0;
//GuessCount counts total number of guesses in game 
var guessCount = 0;


//Initialise empty arrays
var positionArray = new Array(); //Contains information about whether cells are occupied/targeted/empty and the number of pieces targeting targeted cells
var pieceInfoArray = new Array(); //Contains information about the type of pieces on the board and their location
var flagArray = new Array(); //Contains information about the type of flag that is in each cell

//Initialises a 2D array (array of arrays) that contains information about the status of each cell (empty, targeted or occupied)
function initialiseEmpty() {
  var initArray = new Array(ROWNUM);
  for (var i = 0; i < initArray.length; i++) {
    initArray[i] = new Array(COLUMNNUM);
    for (var j = 0; j < initArray.length; j++) {
      initArray[i][j] = empty;
    }
  }
  return initArray;
}

/**
 * Generates a html table to act as the board of play
 * @param {*} rownum Number of rows on the generated board
 * @param {*} columnnum Number of columns of the generated board
 */
function initBoard(rownum, columnnum) {
  let table = document.getElementById("board");
  let tablebody = document.createElement("tbody");
  table.appendChild(tablebody);
  for (var i = 0; i < rownum; i++) {
    let row = document.createElement("tr");
    tablebody.appendChild(row);
    for (var j = 0; j < columnnum; j++) {
      let cell = document.createElement("td");
      cell.classList.add("hidden");
      // cell.classList.add("ratio ratio-1x1")
      cell.setAttribute("onclick", "selectCell(this)");
      cell.innerHTML = " ";
      row.appendChild(cell);
    }
  }
}

/**
 * Creates table elements each showing a piece that is on the grid
 */
function initialisePieceTable() {
  let table = document.getElementById("piecetable");
  let tablebody = document.createElement("tbody");
  table.appendChild(tablebody);
  let row = document.createElement("tr");
  tablebody.appendChild(row);
  for (var i = 0; i < pieceInfoArray.length; i++) {
    let cell = document.createElement("td");
    cell.innerHTML = " ";
    addPieceToCell(cell,pieceNumberToImage(pieceInfoArray[i][0]))
    row.appendChild(cell);
  }
}

/**
 * Adds a right click (contextmenu) EventListener to each cell to use for flags
 */
function initialiseRightClickEvent() {
  for (var i = 0; i < positionArray.length; i++) {
    for (var j = 0; j < positionArray.length; j++) {
      let cell = document.getElementById("board").rows[i].cells[j];
      cell.addEventListener("contextmenu", (event) => {
        //Prevents the context menu from popping up over board
        event.preventDefault();

        let row = event.target.parentNode.rowIndex;
        let column = event.target.cellIndex;
        let targeted = event.target
        if(!cell.classList.contains("targeted")&&!cell.classList.contains("occupied")&&!cell.classList.contains("empty")){
        flag(row, column, targeted);
        }
        //Assigns a flag to a cell if it does not already have a flag, otherwise removes the flag
      });
    }
  }
}

function initialisePieces(pieceArray) {
  for (var i = 0; i < pieceArray.length; i++) {
    let type = pieceArray[i][0];
    let location = pieceArray[i][1];
    let pieceRow = Math.floor(location / ROWNUM);
    let pieceColumn = location % COLUMNNUM;
    switch (type) {
      case 1:
        placeKing(pieceRow, pieceColumn);
        break;

      case 2:
        placeQueen(pieceRow, pieceColumn);
        break;

      case 3:
        placeRook(pieceRow, pieceColumn);
        break;

      case 4:
        placeBishop(pieceRow, pieceColumn);
        break;
    }
  }
}

/**
 * Sets the cell referenced by input row and column as being occupied, and all surrounding adjacent cells as being targeted
 * @param {*} row the row that the piece will be placed in
 * @param {*} column the column that the piece will be placed in
 * @param {*} addOrRemove has a value of 1 (default) if adding a piece to board and -1 if removing piece
 */
function placeKing(row, column, addOrRemove = 1) {
  positionArray[row][column] = occupied;
  //Iterate through a 3x3 grid of cells surrounding the king's location, and assigns these as targeted if valid to do so
  for (var i = -1; i < 2; i++) {
    for (var j = -1; j < 2; j++) {
      let targetedCellRow = row + i;
      let targetedCellColumn = column + j;
      //Checks if cell is on the board and not occupied, and if these checks are met assigns that cell as targeted and adds 1 to the count of pieces targeting that cell
      if (
        isValidCell(targetedCellRow, targetedCellColumn) &&
        positionArray[targetedCellRow][targetedCellColumn] != occupied
      ) {
        positionArray[targetedCellRow][targetedCellColumn] += addOrRemove;
      }
    }
  }
}

function placeRook(row, column, addOrRemove = 1) {
  positionArray[row][column] = occupied;
  for (var i = 0; i < positionArray.length; i++) {
    //Assigns all cells either on the same row or same column of the occupied as targeted, except for the occupied cell itself
    if (positionArray[row][i] != occupied) {
      positionArray[row][i] += addOrRemove;
    }
    if (positionArray[i][column] != occupied) {
      positionArray[i][column] += addOrRemove;
    }
  }
}

function placeBishop(row, column, addOrRemove = 1) {
  positionArray[row][column] = occupied;
  for (var i = 1 - positionArray.length; i < positionArray.length; i++) {
    let targetedCellRow = row + i;
    let targetedCellColumn = column + i;
    if (
      isValidCell(targetedCellRow, targetedCellColumn) &&
      positionArray[targetedCellRow][targetedCellColumn] != occupied
    ) {
      positionArray[targetedCellRow][targetedCellColumn] += addOrRemove;
    }
    //Assign targeted cells for upward sloping diagonal (i.e. those with coordinates (row+i, column-i)
    let targetedCellColumnAlt = column - i;
    if (
      isValidCell(targetedCellRow, targetedCellColumnAlt) &&
      positionArray[targetedCellRow][targetedCellColumnAlt] != occupied
    ) {
      positionArray[targetedCellRow][targetedCellColumnAlt] += addOrRemove;
    }
  }
}

function placeQueen(row, column, addOrRemove = 1) {
  placeRook(row, column, addOrRemove);
  placeBishop(row, column, addOrRemove);
}

/**
 * Checks whether the cell with coordinates (row, column) is on the table and therefore valid
 * @param {*} row
 * @param {*} column
 * @returns true if a valid coordinate and false if not valid
 */
function isValidCell(row, column) {
  if (
    row >= 0 &&
    row < positionArray.length &&
    column >= 0 &&
    column < positionArray.length
  ) {
    return true;
  } else {
    return false;
  }
}

/**
 * Reveals occupied and targeted cells on the board
 */
function showPositions() {
  for (var i = 0; i < positionArray.length; i++) {
    for (var j = 0; j < positionArray.length; j++) {
      let cell = document.getElementById("board").rows[i].cells[j];
      cell.classList.add("guessed");
      cell.classList.remove("selected");
      switch (positionArray[i][j]) {
        case occupied:
          cell.classList.add("occupied");
          let image = pieceNumberToImage(
            checkPieceType(i, j, pieceInfoArray)
          );
          addPieceByIndex(i,j,image);
          break;

        case empty:
          cell.classList.add("empty");
          break;

        default:
          cell.classList.add("targeted");
          cell.firstChild.nodeValue = positionArray[i][j];
          break;
      }
    }
  }
  resetflags();
}

/**
 * Changes formatting of a cell to show that is has been selected/deselected when clicked
 * @param {*} cell references the td object that calls the function when clicked
 */
function selectCell(cell) {
  var rowIndex = cell.parentNode.rowIndex;
  var columnIndex = cell.cellIndex;
  if (
    !cell.classList.contains("selected") &&
    !cell.classList.contains("guessed") &&
    guessCounter < NUMGUESSPERTURN
  ) {
    guessCounter++;
    guessCount++;
    document.getElementById("guesscount").firstChild.nodeValue = guessCount
    cell.classList.add("selected");
  } else {
    if (cell.classList.contains("selected")) {
      guessCounter--;
      guessCount--;
      document.getElementById("guesscount").firstChild.nodeValue = guessCount
    }
    cell.classList.remove("selected");
  }
}

/**
 * Goes through each cell and checks if it has been selected by the player.
 * If the cell has been selected, it reveals whether that cell is occupied, targeted or empty
 */
function guess() {
  for (var i = 0; i < positionArray.length; i++) {
    for (var j = 0; j < positionArray.length; j++) {
      let cell = document.getElementById("board").rows[i].cells[j];
      if (cell.classList.contains("selected")) {
        cell.classList.remove("selected");
        cell.classList.add("guessed");
        switch (positionArray[i][j]) {
          case occupied:
            removePiece(i, j, pieceInfoArray);
            cell.classList.add("occupied");
            let image = pieceNumberToImage(
              checkPieceType(i, j, pieceInfoArray)
            );
            addPieceByIndex(i,j,image)
            break;

          case empty:
            cell.classList.add("empty");
            break;

          default:
            cell.classList.add("targeted");
            cell.firstChild.nodeValue = positionArray[i][j];
            break;
        }
      }
    }
  }
  //Reset guessCounter
  guessCounter = 0;
  turnCounter++;
  resetflags();
  updateBoard();
}

function addPieceToCell(cell, src) {
  let piece_image = document.createElement("img");
  piece_image.src = src;
  piece_image.width = "60"
  piece_image.height = "60"
  cell.appendChild(piece_image);
}

function addPieceByIndex(row, column, src) {
  let piece_image = document.createElement("img");
  piece_image.src = src;
  piece_image.width = "60"
  piece_image.height = "60"
  let cell = document.getElementById("board").rows[row].cells[column];
  cell.appendChild(piece_image);
}


/**
 * Checks the type of piece that is on the cell located by parameters row and column
 * @param {*} row
 * @param {*} column
 */
function checkPieceType(row, column, pieceInfoArray) {
  let pieceLocation = row * ROWNUM + column;
  for (var i = 0; i < pieceInfoArray.length; i++) {
    if (pieceInfoArray[i][1] == pieceLocation) {
      return pieceInfoArray[i][0];
    }
  }
  return 0;
}

function removePiece(row, column, pieceInfoArray) {
  let type = checkPieceType(row, column, pieceInfoArray);
  if (type == 0) {
    console.log("No piece at this location");
  }
  removeFromPieceTable(type, pieceInfoArray);
  switch (type) {
    case 1:
      placeKing(row, column, -1);
      break;

    case 2:
      placeQueen(row, column, -1);
      break;

    case 3:
      placeRook(row, column, -1);
      break;

    case 4:
      placeBishop(row, column, -1);
      break;
  }
}
function removeFromPieceTable(pieceType, pieceInfoArray) {
  for (var i = 0; i < pieceInfoArray.length; i++) {
    let cell = document.getElementById("piecetable").rows[0].cells[i];
    if (
      pieceType == pieceInfoArray[i][0] &&
      !cell.classList.contains("found")
    ) {
      cell.classList.add("found");
      return;
    }
  }
  alert("Found all the pieces");
}

function updateBoard() {
  for (var i = 0; i < positionArray.length; i++) {
    for (var j = 0; j < positionArray.length; j++) {
      let cell = document.getElementById("board").rows[i].cells[j];
      if (cell.classList.contains("targeted")) {
        if (positionArray[i][j] == 0) {
          cell.classList.remove("targeted");
          cell.classList.add("empty");
          cell.firstChild.nodeValue = ' ';
        }
        else {
          cell.firstChild.nodeValue = positionArray[i][j];
        }
      }
    }
  }
}

function pieceNumberToImage(number) {
  switch (number) {
    case 1:
      return "static/images/king.svg";

    case 2:
      return "static/images/queen.svg";

    case 3:
      return "static/images/rook.svg";

    case 4:
      return "static/images/bishop.svg";
  }
}

function main() {
  positionArray = initialiseEmpty();
  pieceInfoArray = generateGameParameters(generateSeed());
  flagArray = initialiseEmpty();
  initialisePieceTable();

  // //Test if array is working
  for (var k = 0; k < pieceInfoArray.length; k++) {
    console.log(pieceInfoArray[k]);
  }
  initBoard(ROWNUM, COLUMNNUM);
  //Initialises right click functionality
  initialiseRightClickEvent();

  initialisePieces(pieceInfoArray);
}
