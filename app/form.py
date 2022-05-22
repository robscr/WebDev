from app import app

from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BoleanField, SubmitField
from wtforms.validators import DataRequired

class RegisterForm(FlaskForm):

    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])

    submit = SubmitField('New User')
