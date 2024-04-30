from flask import Blueprint

accounts_bp = Blueprint("accounts", __name__)

@accounts_bp.route('/')
def index():
    return {"message": "main page"}

@accounts_bp.route('/signup')
def signup():
    return {"message": "sign up"}

@accounts_bp.route('/signin')
def signin():
    return {"message": "sign in"}