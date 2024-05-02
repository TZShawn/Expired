from flask import Flask, request
from Routes.accoutns import accounts_bp
from Routes.fridgeOperations import fridge_bp


app = Flask(__name__)
app.register_blueprint(accounts_bp)
app.register_blueprint(fridge_bp)

if __name__ == "__main__":
    app.run(debug=True)
