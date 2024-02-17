# Import sqlite so we don't have to worry about connecting to a postgres or other external DB
import sqlite3
from flask import current_app, g

import click

def get_db():
    # connect to our database, it exists in the folder above our api
    if 'db' not in g:
        g.db = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row

    return g.db

def close_db(e=None):
    db = g.pop('db',None)

    if db is not None:
        db.close()

def init_db():
    db = get_db()

    with current_app.open_resource('schema.sql') as f:
        db.executescript(f.read().decode('utf8'))

# Set up a init-db command to run via command line to create our initial tables and insert sample data from schema.sql
@click.command('init-db')
def init_db_command():
    init_db()
    click.echo('Database initialized; tables created')

def init_app(app):
    app.teardown_appcontext(close_db)
    # Adding the init_db_command CLI command here on init_app
    app.cli.add_command(init_db_command)