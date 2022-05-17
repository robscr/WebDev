# Chessle-Ship
Chessle-Ship is a game of strategy to successfully locate the pieces on the board. It combines the ship-sinking strategy of battleship with the game environment of chess.

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
   *           **users**
   * To print database: **for user in users:**
   *                    **print(user.id, user.username, user.email)**
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