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

@main.route('/uwsgi-restart')
def uwsgi():
    import subprocess
    shell = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../servers/close_uwsgi.sh")))
    subprocess.call(['sudo', shell])
    return 'uwsgi reloaded';
