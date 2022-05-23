# Chessle-Ship
Chessle-Ship is a game of strategy to successfully locate the pieces on the board. It combines the ship-sinking strategy of battleship with the game environment of chess.

To run Chessle-Ship, clone this repository to your local machine. Ensure that you have installed all dependencies and the flask server is running, then enjoy playing Chessle-Ship in your localhost on the browser.

## Installing and Setting Up Virtual Environment on Linux
    $ python3 -m venv .venv
    $ source .venv/bin/activate
    $ pip install -r requirements.txt
    
## Running App in venv
    $ export FLASK_APP=app.py
    $ flask run

## Interacting with the database
1. Initialising database:
   * **flask db init**
   * **flask db migrate [-m "some_message"]**
   * **flask db upgrade**

2. Enter python shell:
   * **from app import db**
   * **from app.models import User**
   * To create new entry: **u = User(username='user1', email='johno@sample.com')**
   * To view entry identifier: **u**
   * To query: **users = User.query.all()**
   *    **users**
   * To print database: **for user in users:**
   *    **print(user.id, user.username, user.email)**
   * **db.session.add(u)**
   * **db.session.commit()**


## Testing
Initialise database test.db to run test.py unittests

## Next Steps
1. Implement Practice mode 

    -seed js is already set up, generating a random seed number will produce random board
    
2. Only play Daily puzzle once a day

    -logic must be implemented on finished game with database to not allow daily puzzle to be repeated or not add to stats
    
3. Deployment

5. Addition of animations and sound effects

5. Adding Hard Mode

    -Addition of Knights
   
    -Prevent pieces from attacking through other pieces
    
    -Addition of Pawns with Piece Color and Board Direction
## References
Background Images used:
https://c4.wallpaperflare.com/wallpaper/667/940/933/5bd2c908734aa-wallpaper-preview.jpg
https://www.sheknows.com/wp-content/uploads/2020/11/queens-gambit.jpg?w=695&h=391&crop=1

Chess Pieces from:
https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces
