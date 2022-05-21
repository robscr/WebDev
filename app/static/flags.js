function flag(row, column, event) {
    //increment flag by 1
    flagArray[row][column] = (flagArray[row][column]+1) % pieceSymbolArray.length;
    let currentFlag = flagArray[row][column];
    event.target.firstChild.nodeValue = pieceSymbolArray[currentFlag];
    switch (currentFlag) {
        case 1:
            event.target.classList.add("flagged");
            flagKing(row, column, 1);
          break;
    
        case 2:
            flagKing(row, column, -1);
            flagQueen(row, column, 1);
          break;
    
        case 3:
            flagQueen(row, column, -1);
            flagRook(row, column, 1);
        break;
    
        case 4:
            flagRook(row, column, -1);
            flagBishop(row, column, 1);
          break;

        case 0:
            event.target.classList.remove("flagged");
            flagBishop(row, column, -1);
        break;
      }
  }

  function flagKing(row, column, addOrRemove = 1) {
    //Iterate through a 3x3 grid of cells surrounding the king's location, and add king icons to these squares
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let targetedCellRow = row + i;
        let targetedCellColumn = column + j;
        //Checks if cell is on the board is a valid cell and not the cell of the flag, and assigns annotation images to those squuares
        if (
          isValidCell(targetedCellRow, targetedCellColumn) && !(targetedCellRow == row && targetedCellColumn == column) 
        ) {
            //If adding annotations:
          if (addOrRemove == 1) {
            addAnnotation(targetedCellRow, targetedCellColumn, "king", "king.svg");
          }
          else {
            removeAnnotation(targetedCellRow, targetedCellColumn, "king");
          }
        }
      }
    }
  }

  function flagRook(row, column, addOrRemove = 1) {
    for (var i = 0; i < positionArray.length; i++) {
      //Assigns all cells either on the same row or same column of the occupied as targeted, except for the occupied cell itself
      if (i != column) {
        if (addOrRemove == 1) {
            addAnnotation(row, i, "rook", "rook.svg");
          }
          else {
            removeAnnotation(row, i, "rook");
          }
      }
      if (i != row) {
        if (addOrRemove == 1) {
            addAnnotation(i, column, "rook", "rook.svg");
          }
          else {
            removeAnnotation(i, column, "rook");
          }
      }
    }
  }
  
  function flagBishop(row, column, addOrRemove = 1) {
    for (var i = 1 - positionArray.length; i < positionArray.length; i++) {
      let targetedCellRow = row + i;
      let targetedCellColumn = column + i;
      if (
        isValidCell(targetedCellRow, targetedCellColumn) &&
        !(targetedCellRow == row && targetedCellColumn == column)
      ) {
        if (addOrRemove == 1) {
            addAnnotation(targetedCellRow, targetedCellColumn, "bishop", "bishop.svg");
          }
          else {
            removeAnnotation(targetedCellRow, targetedCellColumn, "bishop");
          }
      }
      //Assign targeted cells for upward sloping diagonal (i.e. those with coordinates (row+i, column-i)
      let targetedCellColumnAlt = column - i;
      if (
        isValidCell(targetedCellRow, targetedCellColumnAlt) &&
        !(targetedCellRow == row && targetedCellColumnAlt == column)
      ) {
        if (addOrRemove == 1) {
            addAnnotation(targetedCellRow, targetedCellColumnAlt, "bishop", "bishop.svg");
          }
          else {
            removeAnnotation(targetedCellRow, targetedCellColumnAlt, "bishop");
          }
      }
    }
  }

  function flagQueen(row, column, addOrRemove = 1) {
    for (var i = 0; i < positionArray.length; i++) {
        //Assigns all cells either on the same row or same column of the occupied as targeted, except for the occupied cell itself
        if (i != column) {
          if (addOrRemove == 1) {
              addAnnotation(row, i, "queen", "queen.svg");
            }
            else {
              removeAnnotation(row, i, "queen");
            }
        }
        if (i != row) {
          if (addOrRemove == 1) {
              addAnnotation(i, column, "queen", "queen.svg");
            }
            else {
              removeAnnotation(i, column, "queen");
            }
        }
      }

      for (var i = 1 - positionArray.length; i < positionArray.length; i++) {
        let targetedCellRow = row + i;
        let targetedCellColumn = column + i;
        if (
          isValidCell(targetedCellRow, targetedCellColumn) &&
          !(targetedCellRow == row && targetedCellColumn == column)
        ) {
          if (addOrRemove == 1) {
              addAnnotation(targetedCellRow, targetedCellColumn,  "queen", "queen.svg");
            }
            else {
              removeAnnotation(targetedCellRow, targetedCellColumn,  "queen");
            }
        }
        //Assign targeted cells for upward sloping diagonal (i.e. those with coordinates (row+i, column-i)
        let targetedCellColumnAlt = column - i;
        if (
          isValidCell(targetedCellRow, targetedCellColumnAlt) &&
          !(targetedCellRow == row && targetedCellColumnAlt == column)
        ) {
          if (addOrRemove == 1) {
              addAnnotation(targetedCellRow, targetedCellColumnAlt,  "queen", "queen.svg");
            }
            else {
              removeAnnotation(targetedCellRow, targetedCellColumnAlt,  "queen");
            }
        }
      }
  }


  function addAnnotation(row, column, id, src) {
    var annotation = document.createElement("img");
    annotation.src = src;
    annotation.id = id;
    annotation.width = "30"
    annotation.height = "30"
    let cell = document.getElementById("board").rows[row].cells[column];
    cell.appendChild(annotation);
  }

  function removeAnnotation(row, column, id) {
    let cell = document.getElementById("board").rows[row].cells[column];
    DOM_img = cell.querySelector('#'+id);
    cell.removeChild(DOM_img);
  }
  