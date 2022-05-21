from flask import render_template, url_for
from app import app


# @app.route('/')
# @app.route('/index')
# def index():

#     user = {'username': "Tim"}

#     some_content = [
#         {
#             'creator': {'username': 'John Appleseed'},
#             'content': 'This is the first piece of content'
#         },

#         {
#             'creator': {'username': 'John Doe'},
#             'content': 'This is another piece of content'
#         },

#         {
#             'creator': {'username': 'John Citizen'},
#             'content': 'All this content is written by John(?)'
#         }
#     ]
#     return render_template("index.html", title="Sample Title", user=user, content=some_content)

@app.route('/')
@app.route('/index')
@app.route('/chessleship.html')
def index():
    return render_template('chessleship.html')

@app.route('/rules')
@app.route('/rules.html')
def rules():
    return render_template('rules.html')

@app.route('/settings')
@app.route('/settings.html')
def settings():
    return render_template('settings.html')

@app.route('/stats')
@app.route('/stats.html')
def stats():
    return render_template('stats.html')

@app.route('/login')
def login():
    return render_template('login.html')
