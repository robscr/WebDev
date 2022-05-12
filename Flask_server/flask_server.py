#This will become one of the flask server files. Currently using app.py to test getting the server running first.

from flask import Flask
from flask import render_template, flash, redirect, url_for

app = Flask(__name__)

@app.route("/")
def init_game():
    return "<h1>This is flask_server.py</h1>"

if __name__ == "__main__":
    app.run()

@app.route("/placeholder")
def placeholder():
    return redirect(url_for('static', filename="placeholder.html"))
