from flask import current_app, jsonify, Blueprint

generic_views = Blueprint("generic_views", __name__)


@generic_views.route("/healthcheck")
def print_hello():
    app = current_app._get_current_object()
    app.logger.info("Application is up and running")
    return jsonify(message="Hello, Mind Control!")
