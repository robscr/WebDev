# Chessle-Ship
Chessle-Ship is a game of strategy to successfully locate the pieces on the board. It combines the ship-sinking strategy of battleship with the game environment of chess.

To run Chessle-Ship, clone this repository to your local machine. Ensure that you have installed all dependencies and the flask server is running, then enjoy plating Chessle-Ship in your localhost on the browser.

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


## Guidance for using Git from VSCode
The following commands at each step can be run in the terminal on VSCode. For it to work, ensure that your terminal is in the working directory of the repository. For me this is C:\Users\Patrick\Documents\GitHub\WebDev and yours will probably be something similar.

1. Ensure that you are in the desired branch.

   Use: **git checkout [branch name]**

   ("branch name" is just the name of the branch you want to work in, for example main or rob)


2. Make your changes in the desired documents


3. Save the changes.

   Use: **CTRL + S**


4. You can then add these changes.

   Use: **git add --all**


5. Commit these changes (to your local copy of the repository)

   Use: **git commit -m "commit_message_here"**


6. Push these commits from your branch on your local copy of the repository up to the repository stored on GitHub

   Use: **git push**


Be sure to commit regularly, to provide robust version control. Probably also a good idea to only change one document at a time between commits.

## Pulling from Main
After pulling from main, push to your branch on origin (e.g. origin Lachy) to keep that branch up to date
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
