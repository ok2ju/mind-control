from flask import Blueprint, request, current_app, jsonify

from app.decorators import requires_auth
from app.models import db, MindModel

records_views = Blueprint("records_views", __name__, url_prefix="/api/v1")


@records_views.route("/records", methods=["GET"])
@requires_auth
def get_records():
    records = MindModel.query.all()
    results = [{"id": mind.id, "mood": mind.mood, "energy": mind.energy, "date": mind.date} for mind in records]

    app = current_app._get_current_object()
    app.logger.info("Requested records: %s", len(results))

    return jsonify({"count": len(results), "entities": results}), 200


@records_views.route("/records", methods=["POST"])
@requires_auth
def add_record():
    data = request.get_json()
    record = MindModel(mood=data["mood"], energy=data["energy"])
    db.session.add(record)
    db.session.commit()

    app = current_app._get_current_object()
    app.logger.info("Created a new record")

    return data
