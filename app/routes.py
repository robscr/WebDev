from flask import render_template, url_for
from app import app

@app.route('/')
@app.route('/index')
def index():

    user = {'username': "Tim"}

    some_content = [
        {
            'creator': {'username': 'John Appleseed'},
            'content': 'This is the first piece of content'
        },

        {
            'creator': {'username': 'John Doe'},
            'content': 'This is another piece of content'
        },

        {
            'creator': {'username': 'John Citizen'},
            'content': 'All this content is written by John(?)'
        }
    ]
    return render_template("index.html", title="Sample Title", user=user, content=some_content)