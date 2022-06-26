from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import db, MindModel

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:password@localhost:5432/mind-tracker"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)

@app.route("/healthcheck")
def print_hello():
    return "Hello, Flask!"

@app.route("/records", methods = ["GET"])
def get_records():
    records = MindModel.query.all()
    results = [
        {
            "id": mind.id,
            "mood": mind.mood,
            "energy": mind.energy,
            "date": mind.date
        } for mind in records]

    return { "count": len(results), "entities": results }

@app.route("/records", methods = ["POST"])
def add_record():
    data = request.get_json()
    record = MindModel(mood = data["mood"], energy = data["energy"])
    db.session.add(record)
    db.session.commit()

    return data

if __name__ == "__main__":
    app.run(debug = True)