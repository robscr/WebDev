<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
from app import app

from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BoleanField, SubmitField
from wtforms.validators import DataRequired

class RegisterForm(FlaskForm):

    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])

    submit = SubmitField('New User')
=======
from app import app

from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BoleanField, SubmitField
from wtforms.validators import DataRequired

class RegisterForm(FlaskForm):

    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])

    submit = SubmitField('New User')
>>>>>>> 34de3eab90e4205aa9e4b53ee658405404d277f8
=======
from app import app

from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BoleanField, SubmitField
from wtforms.validators import DataRequired

class RegisterForm(FlaskForm):

    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])

    submit = SubmitField('New User')
>>>>>>> 34de3eab90e4205aa9e4b53ee658405404d277f8
=======
from app import app

from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BoleanField, SubmitField
from wtforms.validators import DataRequired

class RegisterForm(FlaskForm):

    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])

    submit = SubmitField('New User')
>>>>>>> 34de3eab90e4205aa9e4b53ee658405404d277f8
