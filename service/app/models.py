from datetime import datetime

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class MindModel(db.Model):
    __tablename__ = "mind"

    id = db.Column(db.Integer, primary_key = True)
    mood = db.Column(db.Integer, default = 4, nullable = False)
    energy = db.Column(db.Integer, default = 100, nullable = False)
    date = db.Column(db.DateTime, default = datetime.utcnow, nullable = False)

    def __repr__(self):
        return f"<Mind - mood: {self.mood}, energy :{self.energy}>"