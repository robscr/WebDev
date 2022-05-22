from flask import render_template, url_for, flash, redirect, session
from app import app


# @app.route('/')
# @app.route('/index')
# def index():

#     user = {'username': "Tim"}

<<<<<<< HEAD
#     some_content = [
#         {
#             'creator': {'username': 'John Appleseed'},
#             'content': 'This is the first piece of content'
#         },

#         {
#             'creator': {'username': 'John Doe'},
#             'content': 'This is another piece of content'
#         },
=======
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
            try:
                hashed = User.query.all()[someone.id].password_hash
                verification = sha256_crypt.verify(password, hashed)
            except:
                pass
            
            if (username == someone.username) and (verification == True):
                session['user'] = username
                global user
                user = someone
                return redirect(url_for('index'))

        return "<h1>Wrong username or password - placeholder</h1>"
        
    return render_template('login.html', form=form)
>>>>>>> 0d67e4249e2bc631864b13a8ef45619c74fd1404

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
    #if session.get('logged_in'):
    #    return render_template('chessleship.html')
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

#@app.route('/login')
#def login():
    #return render_template('login.html')

#Sample from Tom's tutorial
from app.forms import LoginForm
from app import db
from app.models import User

@app.route('/register', methods=['GET', 'POST'])
def register():
    
    form = LoginForm()
    
    if form.validate_on_submit():
<<<<<<< HEAD
        user = User(username=form.username.data, password_hash=form.password.data)
=======
        #hashed_password = 
        raw_password = form.password.data
        encrypted_password = sha256_crypt.hash(raw_password)

        user = User(username=form.username.data, password_hash=encrypted_password)
>>>>>>> 0d67e4249e2bc631864b13a8ef45619c74fd1404
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
