from flask import render_template, url_for, flash, redirect, session, abort, request
from app import app
import os

from app.forms import LoginForm
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
    
    this_user = session['user']
    identity = session['id']
    num_games = User.query.get(int(identity)).games_played
    num_guesses = round(float(User.query.get(int(identity)).average_guesses) / float(User.query.get(int(identity)).games_played), 4)

    users = User.query.all()
    stats_list = []

    for user in users:
        stats_list.append((user.games_played, user.username))
    stats_list = sorted(stats_list)

    top_1_score = stats_list[-1][0]
    top_1_user = stats_list[-1][1]

    top_2_score = stats_list[-2][0]
    top_2_user = stats_list[-2][1]

    youser_score = num_games
    youser = this_user
    
    return render_template('stats.html', games_played=num_games, average_guesses=num_guesses, top_1_score=top_1_score, top_2_score=top_2_score, top_1_user=top_1_user, top_2_user=top_2_user, youser_score=youser_score, youser=youser)


#Sample from Tom's tutorial
@app.route('/register', methods=['GET', 'POST'])
@app.route('/register.html', methods=['GET', 'POST'])
def register():
    
    form = LoginForm()
    
    if form.validate_on_submit():
        #hashed_password = 
        raw_password = form.password.data
        encrypted_password = sha256_crypt.hash(raw_password)

        user = User(username=form.username.data, password_hash=encrypted_password, games_played=0, average_guesses=0.0)
        db.session.add(user)
        db.session.commit()

        session['user'] = form.username.data
        session['id'] = user.id
        return redirect(url_for('index'))

    #if form.validate_on_submit():
    #    user = User()
    #    
    #    #flash('login requested for user {}, remember_me={}'.format(
    #    #    form.username.data, form.remember_me.data))
    #    return redirect(url_for('index'))
    
    return render_template('register.html', title='sign in', form=form)


#Decorators to handle user stat tracking
@app.route('/gameplay', methods=['GET', 'POST'])
def gameplay():
    if request.method == 'POST':

        user_id = session['id']
        user = User.query.get(user_id)
        user.games_played = User.games_played + 1

        db.session.commit()

        return render_template("chessleship.html")

    return render_template('index.html')

@app.route('/guess', methods=['GET', 'POST'])
def guess():
    if request.method == 'POST':

        user_id = session['id']
        user = User.query.get(user_id)
        user.average_guesses = User.average_guesses + 1

        db.session.commit()

        return render_template("chessleship.html")

    return render_template('index.html')
