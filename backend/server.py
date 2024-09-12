from flask import Flask, request
from Routes.accoutns import accounts_bp
from Routes.fridgeOperations import fridge_bp
from Routes.recipeManager import recipe_bp
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
app.register_blueprint(accounts_bp)
app.register_blueprint(fridge_bp)
app.register_blueprint(recipe_bp)

if __name__ == "__main__":
    app.run(debug=True)
