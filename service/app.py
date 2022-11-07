import logging
import json
from functools import wraps

from flask import Flask, request, jsonify, Response, _request_ctx_stack
from flask_migrate import Migrate
from flask_cors import CORS
from six.moves.urllib.request import urlopen
from jose import jwt
from models import db, MindModel

app = Flask(__name__)
app.config.from_pyfile('settings.py')
logging.basicConfig(filename='logs.log', level=logging.DEBUG, format=f'%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s')

CORS(app, resources={r'/api/v1/*': {'origins': '*'}})

db.init_app(app)
migrate = Migrate(app, db)

class AuthError(Exception):
    def __init__(self, error, status_code):
        super().__init__()
        self.error = error
        self.status_code = status_code

def get_token_auth_header() -> str:
    """Obtains the access token from the Authorization Header
    """
    auth = request.headers.get('Authorization', None)

    if not auth:
        raise AuthError({
            "code": "authorization_header_missing",
            "description": "Authorization header is expected"
        }, 401)

    parts = auth.split()

    if parts[0].lower() != "bearer":
        raise AuthError({
            "code": "invalid_header",
            "description": "Authorization header must start with Bearer"
        }, 401)

    if len(parts) == 1:
        raise AuthError({
            "code": "invalid_header",
            "description": "Token not found"
        }, 401)

    if len(parts) > 2:
        raise AuthError({
            "code": "invalid_header",
            "description": "Authorization header must be Bearer token"
        }, 401)

    token = parts[1]

    return token

def requires_auth(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        token = get_token_auth_header()
        jsonurl = urlopen("https://" + app.config["AUTH0_DOMAIN"] + "/.well-known/jwks.json")
        jwks = json.loads(jsonurl.read())

        try:
            unverified_header = jwt.get_unverified_header(token)
        except jwt.JWTError as jwt_error:
            raise AuthError({
                "code": "invalid_header",
                "description": "Invalid header. Use an RS256 signed JWT Access Token"
            }, 401) from jwt_error

        if unverified_header["alg"] == "HS256":
            raise AuthError({
                "code": "invalid_header",
                "description": "Invalid header. Use an RS256 signed JWT Access Token"
            }, 401)

        rsa_key = {}

        for key in jwks["keys"]:
            if key["kid"] == unverified_header["kid"]:
                rsa_key = {
                    "kty": key["kty"],
                    "kid": key["kid"],
                    "use": key["use"],
                    "n": key["n"],
                    "e": key["e"]
                }

        if rsa_key:
            try:
                payload = jwt.decode(
                    token,
                    rsa_key,
                    algorithms=app.config["ALGORITHMS"],
                    audience=app.config["API_IDENTIFIER"],
                    issuer="https://" + app.config["AUTH0_DOMAIN"] + "/"
                )
            except jwt.ExpiredSignatureError as expired_sign_error:
                raise AuthError({
                    "code": "token_expired",
                    "description": "token is expired"
                }, 401) from expired_sign_error
            except jwt.JWTClaimsError as jwt_claims_error:
                raise AuthError({
                    "code": "invalid_claims",
                    "description": "incorrect claims, please check the audience and issuer"
                }, 401) from jwt_claims_error
            except Exception as exc:
                raise AuthError({
                    "code": "invalid_header",
                    "description": "Unable to parse authentication token."
                }, 401) from exc

            _request_ctx_stack.top.current_user = payload
            return func(*args, **kwargs)

        raise AuthError({
            "code": "invalid_header",
            "description": "Unable to find appropriate key"
        }, 401)

    return decorated

@app.errorhandler(AuthError)
def handle_auth_error(ex) -> Response:
    response = jsonify(ex.error)
    response.status_code = ex.status_code
    return response

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
    return jsonify(message='Hello, Flask!')

@app.route('/api/v1/records', methods = ['GET'])
@requires_auth
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
@requires_auth
def add_record():
    data = request.get_json()
    record = MindModel(mood = data['mood'], energy = data['energy'])
    db.session.add(record)
    db.session.commit()

    app.logger.info('Created a new record')

    return data

if __name__ == '__main__':
    app.run(debug = True)