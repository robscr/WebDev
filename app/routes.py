from flask import render_template, url_for, flash, redirect, session, abort, request
from app import app
import os

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
from flask_login import LoginManager
from app.forms import LoginForm
from app import db
from app.models import User


@app.route('/login', methods=['GET', 'POST'])
def login():
    # Here we use a class of some kind to represent and validate our
    # client-side form data. For example, WTForms is a library that will
    # handle this for us, and we use a custom LoginForm to validate.
    form = LoginForm()

    users = User.query.all()
    properties_list = []
    for someone in users:
        properties_list.append((someone.id, someone.username, someone.password_hash))

    if form.validate_on_submit():

        if request.method == 'POST':
            username = request.form.get('username')
            password = request.form.get('password')

        for someone in properties_list:
            if (username == someone[1]) and (password == someone[2]):
                session['user'] = username
                global user
                user = someone
                return redirect(url_for('index'))
        return "<h1>Wrong username or password - placeholder</h1>"
        
    return render_template('login.html', form=form)


@app.route('/')
@app.route('/index')
@app.route('/chessleship.html')
def index():
    username = request.form.get('username')

    if ('user' in session and session['user'] == user[1]):
    #if session.get('logged_in'):
        #return render_template('chessleship.html')
        return render_template('chessleship.html')
    return redirect(url_for('login'))

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

#@app.route('/login')
#def login():
    #return render_template('login.html')

#Sample from Tom's tutorial


@app.route('/register', methods=['GET', 'POST'])
def register():
    
    form = LoginForm()
    
    if form.validate_on_submit():
        user = User(username=form.username.data, password_hash=form.password.data)
        db.session.add(user)
        db.session.commit()
        return redirect(url_for('index'))

    #if form.validate_on_submit():
    #    user = User()
    #    
    #    #flash('login requested for user {}, remember_me={}'.format(
    #    #    form.username.data, form.remember_me.data))
    #    return redirect(url_for('index'))
    
    return render_template('register.html', title='sign in', form=form)

    # if form.validate_on_submit():
    #     # Login and validate the user.
    #     # user should be an instance of your `User` class
    #     user = User()
    #     LoginManager.login_user(user)

    #     flash('Logged in successfully.')

    #     next = request.args.get('next')
    #     # is_safe_url should check if the url is safe for redirects.
    #     # See http://flask.pocoo.org/snippets/62/ for an example.
    #     if not LoginManager.is_safe_url(next):
    #         return abort(400)

    #     return redirect(next or url_for('index'))
    # return render_template('login.html', form=form)