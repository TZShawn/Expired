from json import dump
from flask import Blueprint, jsonify, request

from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

from dotenv import load_dotenv
import os

from openai import OpenAI

from datetime import datetime, timedelta

load_dotenv()

uri = os.getenv("MONGO_PASSWORD")

client = MongoClient(uri, server_api=ServerApi("1"))

recipe_bp = Blueprint("recipes", __name__)


@recipe_bp.route("/generateRecipe", methods=["POST"])
def addFridge():
    body = request.json

    db = client["ExpiredDB"]
    collection = db["Recipes"]

    openAIClient = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    completion = openAIClient.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "You are to create a recipe with a given list of ingredients, things like seasoning can not be included in the given list but most of the ingredients" + 
                "used should come from the given list of ingredients. You are to return the recipe in the form of an object with the following fields" +
                "rceipe_name: <string>, ingredients: Array<string> of each ingredient as its own index, Cooking_Steps: Array<string> where each index is one step of the recipe",
            },
            {
                "role": "user",
                "content": body["ingredients"]
            },
        ],
    )

    collection.insert_one(jsonify(completion.choices[0].message.content))


    return {"response": 200, "fridge": collection.
