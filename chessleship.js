//Enumerate values for empty, and occupied cells
//If a cell has any other value is is targeted by that number of pieces
const empty = 0;
const occupied = 99;

//Set size of board
const ROWNUM = 8;
const COLUMNNUM = 8;

//Initialise empty array
var positionArray = initialiseEmpty();
var testArray = new Array;

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
  var tablebody = document.createElement("tbody");
  table.appendChild(tablebody);
  for (var i = 0; i < rownum; i++) {
    var row = document.createElement("tr");
    tablebody.appendChild(row);
    for (var j = 0; j < columnnum; j++) {
      var cell = document.createElement("td");
      cell.classList.add("hidden");
      cell.setAttribute("onclick", "selectCell(this)");
      row.appendChild(cell);
    }
  }
}

/**
 * Adds a right click (contextmenu) EventListener to each cell to use for flags
 */
function initialiseRightClickEvent() {
  for (var i = 0; i < positionArray.length; i++) {
    for (var j = 0; j < positionArray.length; j++) {
      cell = document.getElementById("board").rows[i].cells[j];
      cell.addEventListener("contextmenu", (event) => {
        //Prevents the context menu from popping up over board
        event.preventDefault();
        //Console log test commands
        /*console.log(event.button);
        console.log("column is " + event.target.cellIndex);*/

        //Assigns a flag to a cell if it does not already have a flag, otherwise removes the flag
        if (event.target.innerHTML == "") {
          event.target.innerHTML = "F";
          event.target.classList.add("flagged");
        } else {
          event.target.innerHTML = "";
          event.target.classList.remove("flagged");
        }
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
 */
function placeKing(row, column) {
  positionArray[row][column] = occupied;
  //Iterate through a 3x3 grid of cells surrounding the king's location, and assigns these as targeted if valid to do so
  for (var i = -1; i < 2; i++) {
    for (var j = -1; j < 2; j++) {
      let targetedCellRow = row + i;
      let targetedCellColumn = column + j;
      //Checks if cell is on the board and not occupied, and if these checks are met assigns that cell as targeted
      if (
        isValidCell(targetedCellRow, targetedCellColumn) &&
        positionArray[targetedCellRow][targetedCellColumn] != occupied
      ) {
        positionArray[targetedCellRow][targetedCellColumn] += 1;
      }
    }
  }
}

function placeRook(row, column) {
  positionArray[row][column] = occupied;
  for (var i = 0; i < positionArray.length; i++) {
    //Assigns all cells either on the same row or same column of the occupied as targeted, except for the occupied cell itself
    if (positionArray[row][i] != occupied) {
      positionArray[row][i] += 1;
    }
    if (positionArray[i][column] != occupied) {
      positionArray[i][column] += 1;
    }
  }
}

function placeBishop(row, column) {
  positionArray[row][column] = occupied;
  for (var i = 1 - positionArray.length; i < positionArray.length; i++) {
    let targetedCellRow = row + i;
    let targetedCellColumn = column + i;
    if (
      isValidCell(targetedCellRow, targetedCellColumn) &&
      positionArray[targetedCellRow][targetedCellColumn] != occupied
    ) {
      positionArray[targetedCellRow][targetedCellColumn] += 1;
    }
    //Assign targeted cells for upward sloping diagonal (i.e. those with coordinates (row+i, column-i)
    let targetedCellColumnAlt = column - i;
    if (
      isValidCell(targetedCellRow, targetedCellColumnAlt) &&
      positionArray[targetedCellRow][targetedCellColumnAlt] != occupied
    ) {
      positionArray[targetedCellRow][targetedCellColumnAlt] += 1;
    }
  }
}

function placeQueen(row, column) {
  placeRook(row, column);
  placeBishop(row, column);
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
      cell = document.getElementById("board").rows[i].cells[j];
      switch (positionArray[i][j]) {
        case occupied:
          cell.classList.add("occupied");
          cell.innerHTML = checkPiece(i,j,testArray);
          break;

        case empty:
          //cell.classList.add("empty");
          break;

        default:
          cell.classList.add("targeted");
          cell.innerHTML = positionArray[i][j];
          break;
      }
    }
  }
}

/**
 * Changes formatting of a cell to show that is has been selected/deselected when clicked
 * @param {*} cell references the td object that calls the function when clicked
 */
function selectCell(cell) {
  var rowIndex = cell.parentNode.rowIndex;
  var columnIndex = cell.cellIndex;
  if (cell.classList.contains("selected")) {
    cell.classList.remove("selected");
  } else {
    cell.classList.add("selected");
  }
}

/**
 * Goes through each cell and checks if it has been selected by the player.
 * If the cell has been selected, it reveals whether that cell is occupied, targeted or empty
 */
function guess() {
  for (var i = 0; i < positionArray.length; i++) {
    for (var j = 0; j < positionArray.length; j++) {
      cell = document.getElementById("board").rows[i].cells[j];
      if (cell.classList.contains("selected")) {
        cell.classList.remove("selected");
        switch (positionArray[i][j]) {
          case occupied:
            cell.classList.add("occupied");
            break;

          case empty:
            cell.classList.add("empty");
            break;

          default:
            cell.classList.add("targeted");
            cell.innerHTML = positionArray[i][j];
            break;
        }
      }
    }
  }
}
/**
 * Checks the type of piece that is on the cell located by parameters row and column
 * @param {*} row 
 * @param {*} column 
 */
function checkPiece(row,column,pieceInfoArray) {
  let pieceLocation = row*ROWNUM+column;
  for (var i = 0; i < pieceInfoArray.length; i++) {
    if (pieceInfoArray[i][1] == pieceLocation) {
      return pieceInfoArray[i][0];
    }
  }
  return 0;
}

function main() {
  var pieceInfoArray = generateGameParameters(generateSeed());
  testArray = pieceInfoArray;

  // //Test if array is working
  for (var k = 0; k < pieceInfoArray.length; k++) {
    console.log(pieceInfoArray[k]);
  }
  initBoard(ROWNUM, COLUMNNUM);
  //Initialises right click functionality
  initialiseRightClickEvent();

  initialisePieces(pieceInfoArray);

}
