from flask import render_template, url_for, flash, redirect, session, abort, request
from app import app
import os

from app.forms import LoginForm, PostData
from app import db
from app.models import User

from passlib.hash import sha256_crypt

@app.route('/login', methods=['GET', 'POST'])
@app.route('/login.html', methods=['GET', 'POST'])
def login():

    form = LoginForm()

    users = User.query.all()
    properties_list = []

    for someone in users:
        properties_list.append((someone.id, someone.username, someone.password_hash))
    
    hash_list = []

    for someone in users:
        hash_list.append(someone.password_hash)

    if form.validate_on_submit():

        if request.method == 'POST':
            username = request.form.get('username')
            password = request.form.get('password')
        
        for someone in users:
            session_id = someone.id
            try:
                hashed = User.query.all()[someone.id].password_hash
                verification = sha256_crypt.verify(password, hashed)
            except:
                pass
            
            if (username == someone.username) and (verification == True):
                session['user'] = username
                session['id'] = session_id
                global user
                user = someone
                return redirect(url_for('index'))

        return "<h1>Wrong username or password - placeholder</h1>"
        
    return render_template('login.html', form=form)


@app.route('/')
@app.route('/index')
@app.route('/chessleship')
@app.route('/chessleship.html')
def index():
    #Require login to access game:
    # ('user' in session and session['user'] == user[1]):
    #    return render_template('chessleship.html')

    #return redirect(url_for('login'))
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
    users = User.query.all()
    #user = session['user']
    identity = session['id']
    num_games = User.query.get(int(identity)).games_played
    
    return render_template('stats.html', games_played=num_games)


#Sample from Tom's tutorial
@app.route('/register', methods=['GET', 'POST'])
@app.route('/register.html', methods=['GET', 'POST'])
def register():
    
    form = LoginForm()
    
    if form.validate_on_submit():
        #hashed_password = 
        raw_password = form.password.data
        encrypted_password = sha256_crypt.hash(raw_password)

        user = User(username=form.username.data, password_hash=encrypted_password)
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

show_clicked = 0
@app.route('/gameplay', methods=['GET', 'POST'])
def gameplay():
    if request.method == 'POST':

        user_id = session['id']
        user = User.query.get(user_id)
        user.games_played = User.games_played + 2
        db.session.commit()

        games_played = User.query.get(user_id).games_played
        
        
        return render_template("chessleship.html", games_played=games_played)

    return render_template('index.html')
    #Get webpage to POST that game has been played

    #receive the POST information
    #retrieve the games_played value for the user from the database
    #increment it by one
