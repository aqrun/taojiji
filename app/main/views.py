from flask import render_template
from . import main
from flask_security import login_required


@main.route('/')
@login_required
def hello():
    return render_template('index.html')