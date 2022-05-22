from flask import Flask

app = Flask(__name__)

@app.route("/")
def init_game():
    return "<h1>Test Flask</h1> <link aref=chessweeper.html>"

if __name__ == "__main__":
    app.run()