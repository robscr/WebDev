from app import db
from flask_login import UserMixin


class User(UserMixin,db.Model):

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    games_played = db.Column(db.Integer, index=True)
    average_guesses = db.Column(db.Float, index=True)

    def __repr__(self):
        return f'<User {self.username}>'

from app import login
@login.user_loader
def load_user(id):
    return User.query.get(int(id))
