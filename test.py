import os, unittest
from app import app, db
from app.models import User

class UserModelCase(unittest.TestCase):

    def setUp(self):
        basedir = os.path.abspath(os.path.dirname(__file__))
        app.config['TESTING'] = True
        app.config['WTF_CSRF_ENABLED'] = False
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

    def testUserDetails(self):
        user = User.query.get(1)
        self.assertEqual(user.username,"lachy")
        self.assertEqual(user.games_played, 0,"lachy")
        self.assertEqual(user.average_guesses, 0,"lachy")
        self.assertTrue(user.check_password("Test"))
        self.assertFalse(user.check_password("aest"))

    def testAddGuesses(self):
        user = User.query.get(1)
        user.average_guesses = User.average_guesses + 32
        self.assertEqual(user.average_guesses, 32,"lachy")
        user.average_guesses = User.average_guesses + 1
        self.assertEqual(user.average_guesses, 33,"lachy")

        

if __name__ == "main":
    unittest.main()