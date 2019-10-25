from flask import render_template, redirect
from . import main
from flask_security import login_required, logout_user


@main.route('/')
@login_required
def hello():
    return render_template('index.html')


@main.route('/logout')
def logout():
    logout_user()
    return redirect('/')
