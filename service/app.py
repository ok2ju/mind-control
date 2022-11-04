import logging

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from models import db, MindModel

app = Flask(__name__)
app.config.from_pyfile('settings.py')
CORS(app)
logging.basicConfig(filename='logs.log', level=logging.DEBUG, format=f'%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s')

db.init_app(app)
migrate = Migrate(app, db)

@app.errorhandler(404)
def not_found(error=None):
    message = {
        'status': 404,
        'message': 'Not found: ' + request.url
    }
    response = jsonify(message)
    response.status_code = 404

    return response

@app.route('/healthcheck')
def print_hello():
    app.logger.info('Application is up and running')
    return 'Hello, Flask!'

@app.route('/api/v1/records', methods = ['GET'])
def get_records():
    records = MindModel.query.all()
    results = [
        {
            'id': mind.id,
            'mood': mind.mood,
            'energy': mind.energy,
            'date': mind.date
        } for mind in records]

    app.logger.info('Requested records:', len(results))

    return { 'count': len(results), 'entities': results }

@app.route('/api/v1/records', methods = ['POST'])
def add_record():
    data = request.get_json()
    record = MindModel(mood = data['mood'], energy = data['energy'])
    db.session.add(record)
    db.session.commit()

    app.logger.info('Created a new record')

    return data

if __name__ == '__main__':
    app.run(debug = True)