from flask import Flask
from flask import render_template, flash, redirect, url_for

app = Flask(__name__)

@app.route("/")
def init_game():
    return "<h1>Test Flask</h1>"

@app.route("/placeholder")
def placeholder():
    return redirect(url_for('static', filename="placeholder.html"))

if __name__ == "__main__":
    app.run()

