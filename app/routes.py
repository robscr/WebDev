from flask import render_template, url_for, flash, redirect, session, abort, request
from app import app
import os

#from flask_login import LoginManager
from app.forms import LoginForm
from app import db
from app.models import User


@app.route('/login', methods=['GET', 'POST'])
def login():

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
@app.route('/chessleship')
@app.route('/chessleship.html')
def index():
    if ('user' in session and session['user'] == user[1]):
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


#Sample from Tom's tutorial
@app.route('/register', methods=['GET', 'POST'])
@app.route('/register.html', methods=['GET', 'POST'])
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
