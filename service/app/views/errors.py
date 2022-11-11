from flask import request, jsonify, Blueprint

error_views = Blueprint("error_views", __name__)


@error_views.errorhandler(403)
def forbidden(error=None):
    message = {"status": 403, "message": "Forbidden"}
    response = jsonify(message)
    response.status_code = 403

    return response


@error_views.errorhandler(404)
def not_found(error=None):
    message = {"status": 404, "message": "Not found: " + request.url}
    response = jsonify(message)
    response.status_code = 404

    return response


@error_views.errorhandler(500)
def internal_error(error=None):
    message = {"status": 500, "message": "Internal server error"}
    response = jsonify(message)
    response.status_code = 500

    return response
