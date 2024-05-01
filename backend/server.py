from flask import Flask, request
from Routes.accounts.accoutns import accounts_bp


app = Flask(__name__)
app.register_blueprint(accounts_bp)


if __name__ == "__main__":
    app.run(debug=True)
