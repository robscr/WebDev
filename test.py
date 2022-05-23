import os, unittest
from app import app, db
from app.models import User

class UserModelCase(unittest.TestCase):

    def setUp(self):
        basedir = os.path.abspath(os.path.dirname(__file__))
        app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(basedir, "test.db")
        self.app = app.test_client() # create virtual test env
        db.create_all()
        s1 = User(username = "lachy", games_played = 0, average_guesses = 0)
        s1.set_password("Test")
        s2 = User(username = "rob", games_played = 1, average_guesses = 10)
        s2.set_password("User")
        db.session.add(s1)
        db.session.add(s2)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

