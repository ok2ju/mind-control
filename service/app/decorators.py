from json import loads
from functools import wraps
from flask import current_app, request, _request_ctx_stack, jsonify
from six.moves.urllib.request import urlopen
from jose import jwt

def get_token_auth_header() -> str:
    """Obtains the access token from the Authorization Header
    """
    auth = request.headers.get('Authorization', None)

    if not auth:
        return jsonify({
            "code": "authorization_header_missing",
            "description": "Authorization header is expected"
        }), 401

    parts = auth.split()

    if parts[0].lower() != "bearer":
        return jsonify({
            "code": "invalid_header",
            "description": "Authorization header must start with Bearer"
        }), 401

    if len(parts) == 1:
        return jsonify({
            "code": "invalid_header",
            "description": "Token not found"
        }), 401

    if len(parts) > 2:
        return jsonify({
            "code": "invalid_header",
            "description": "Authorization header must be Bearer token"
        }), 401

    token = parts[1]

    return token

def requires_auth(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        app = current_app._get_current_object()
        
        token = get_token_auth_header()
        jsonurl = urlopen("https://" + app.config["AUTH0_DOMAIN"] + "/.well-known/jwks.json")
        jwks = loads(jsonurl.read())

        try:
            unverified_header = jwt.get_unverified_header(token)
        except jwt.JWTError:
            return jsonify({
                "code": "invalid_header",
                "description": "Invalid header. Use an RS256 signed JWT Access Token"
            }), 401

        if unverified_header["alg"] == "HS256":
            return jsonify({
                "code": "invalid_header",
                "description": "Invalid header. Use an RS256 signed JWT Access Token"
            }), 401

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
                    algorithms=app.config["AUTH0_ALGORITHMS"],
                    audience=app.config["AUTH0_API_IDENTIFIER"],
                    issuer="https://" + app.config["AUTH0_DOMAIN"] + "/"
                )
            except jwt.ExpiredSignatureError:
                return jsonify({
                    "code": "token_expired",
                    "description": "token is expired"
                }), 401
            except jwt.JWTClaimsError:
                return jsonify({
                    "code": "invalid_claims",
                    "description": "incorrect claims, please check the audience and issuer"
                }), 401
            except Exception:
                return jsonify({
                    "code": "invalid_header",
                    "description": "Unable to parse authentication token."
                }), 401

            _request_ctx_stack.top.current_user = payload
            return func(*args, **kwargs)

        return jsonify({
            "code": "invalid_header",
            "description": "Unable to find appropriate key"
        }), 401

    return decorated