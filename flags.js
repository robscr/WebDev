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
          break;
    
        case 3:
            flagRook(row, column, 1);
        break;
    
        case 4:
            flagRook(row, column, -1);
          break;

        case 0:
            event.target.classList.remove("flagged");
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
            addAnnotation(targetedCellRow, targetedCellColumn, "king", "download.jpg");
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
            addAnnotation(row, i, "rook", "download.jpg");
          }
          else {
            removeAnnotation(row, i, "rook");
          }
      }
      if (i != row) {
        if (addOrRemove == 1) {
            addAnnotation(i, column, "rook", "download.jpg");
          }
          else {
            removeAnnotation(i, column, "rook");
          }
      }
    }
  }
  


  function addAnnotation(row, column, id, src) {
    var annotation = document.createElement("img");
    annotation.src = src;
    annotation.id = id;
    let cell = document.getElementById("board").rows[row].cells[column];
    cell.appendChild(annotation);
  }

  function removeAnnotation(row, column, id) {
    let cell = document.getElementById("board").rows[row].cells[column];
    DOM_img = cell.querySelector('#'+id);
    cell.removeChild(DOM_img);
  }
  