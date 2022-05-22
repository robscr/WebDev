function resetflags() {
  for (var i = 0; i < positionArray.length; i++) {
    for (var j = 0; j < positionArray.length; j++) {
      while(flagArray[i][j]!=0){
        let target = document.getElementById("board").rows[i].cells[j];
        flag(i,j,target);
      }
    }
  }
}

function flag(row, column, targeted) {
    //increment flag by 1
    flagArray[row][column] = (flagArray[row][column]+1) % pieceSymbolArray.length;
    let currentFlag = flagArray[row][column];
    
  
    switch (currentFlag) {
        case 1:
          targeted.classList.add("flagged");
            flagKing(row, column, 1);
            addFlagImage(targeted,pieceNumberToImage(currentFlag));
          break;
    
        case 2:
            flagKing(row, column, -1);
            flagQueen(row, column, 1);
            removeFlagImage(targeted);
            addFlagImage(targeted,pieceNumberToImage(currentFlag));
          break;
    
        case 3:
            flagQueen(row, column, -1);
            flagRook(row, column, 1);
            removeFlagImage(targeted);
            addFlagImage(targeted,pieceNumberToImage(currentFlag));
        break;
    
        case 4:
            flagRook(row, column, -1);
            flagBishop(row, column, 1);
            removeFlagImage(targeted);
            addFlagImage(targeted,pieceNumberToImage(currentFlag));
          break;

        case 0:
          targeted.classList.remove("flagged");
            flagBishop(row, column, -1);
            removeFlagImage(targeted);
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
            addAnnotation(targetedCellRow, targetedCellColumn, "king", "static/images/king.svg");
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
            addAnnotation(row, i, "rook", "static/images/rook.svg");
          }
          else {
            removeAnnotation(row, i, "rook");
          }
      }
      if (i != row) {
        if (addOrRemove == 1) {
            addAnnotation(i, column, "rook", "static/images/rook.svg");
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
            addAnnotation(targetedCellRow, targetedCellColumn, "bishop", "static/images/bishop.svg");
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
            addAnnotation(targetedCellRow, targetedCellColumnAlt, "bishop", "static/images/bishop.svg");
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
              addAnnotation(row, i, "queen", "static/images/queen.svg");
            }
            else {
              removeAnnotation(row, i, "queen");
            }
        }
        if (i != row) {
          if (addOrRemove == 1) {
              addAnnotation(i, column, "queen", "static/images/queen.svg");
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
              addAnnotation(targetedCellRow, targetedCellColumn,  "queen", "static/images/queen.svg");
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
              addAnnotation(targetedCellRow, targetedCellColumnAlt,  "queen", "static/images/queen.svg");
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
    // annotation.width = "30"
    // annotation.height = "30"
    annotation.classList.add("SMflag", "flag");
    let cell = document.getElementById("board").rows[row].cells[column];
    cell.appendChild(annotation);
  }

  function removeAnnotation(row, column, id) {
    let cell = document.getElementById("board").rows[row].cells[column];
    DOM_img = cell.querySelector('#'+id);
    cell.removeChild(DOM_img);
  }
  
  function addFlagImage(cell, src) {
    let piece_image = document.createElement("img");
    // let div = document.createElement("")
    piece_image.src = src;
    piece_image.id = "flag";
    // piece_image.width = "60";
    // piece_image.height = "60";
    piece_image.classList.add("LGflag","flag");
    // cell.classList.add("qflag");
    cell.appendChild(piece_image);
  }

  function removeFlagImage(cell) {
    let DOM_img = cell.querySelector('#flag');
    cell.removeChild(DOM_img);
  }

  
