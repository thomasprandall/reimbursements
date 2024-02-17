import os
# choosing flask as lightweight framework to build API
from flask import Flask

def create_app(test_config = None):

    app = Flask(__name__, instance_relative_config=True)

    app.config.from_mapping(
        SECRET_KEY='TR-Dev',
        DATABASE=os.path.join(app.instance_path,'api.sqlite'),
    )

    # TODO test config stuff
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # debug route to ensure backend is running correctly, would point to docs in production most likely
    @app.route('/')
    def valid():
        return "App home route valid"

    # Going to implement blueprints to provide more code reusability and reduced boilerplate
    from .blueprints import request
    app.register_blueprint(request.request_bp)

    # init sqlite database
    from . import db
    db.init_app(app)

    return app