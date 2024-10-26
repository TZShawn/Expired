from json import dump
import json
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

@recipe_bp.route("/getrecipes", methods=['POST'])
def addRecipe():
    ingredients = request.json["ingredients"]

    db = client["ExpiredDB"]
    collections = db["Recipes"]

    allRecipes = collections.find()
    allRecipeCollection = []
    for recipe in allRecipes:
        recipe['_id'] = str(recipe['_id'])
        
        numberOfOwned = 0
        for ing in ingredients:
            print(ing.lower(), recipe['ingredients'])
            if ing.lower() in recipe['ingredients']:
                numberOfOwned += 1
        
        if (numberOfOwned / len(recipe['ingredients'])) * 100 > 50:
            allRecipeCollection.append(recipe)


    return {"response": 200, "result": allRecipeCollection}

@recipe_bp.route("/generateRecipe", methods=['POST'])
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
                "used should come from the given list of ingredients. You are to return the recipe in the form of an object with the following fields with the keys wrapped in double quotes" +
                "recipeName: <string>, 'ingredients': Array<string> of each ingredient as its own index, 'cookingSteps': Array<string> where IMPORTANT each index is one step of the recipe without the step number",
            },
            {
                "role": "user",
                "content": body["ingredients"]
            },
        ],
    )

    # completionStr = '{recipe_name: "Citrus Steak and Veggie Salad", ingredients: ["steak", "apple", "carrots", "orange", "peas"], cooking_steps: [ "Start by grilling the steak to your desired level of doneness, then set aside to rest.", "Peel and chop the apple, carrots, and orange into bite-sized pieces.", "In a large bowl, combine the chopped apple, carrots, orange segments, and peas.", "Thinly slice the rested steak and add it to the bowl of mixed fruits and vegetables.", "Toss the salad gently to mix all the ingredients together.", "Serve the citrus steak and veggie salad immediately and enjoy!"]}'

    # messageContent = json.loads(completionStr)
    messageContent = json.loads(completion.choices[0].message.content)

    collection.insert_one(messageContent)
    messageContent['_id'] = str(messageContent['_id'])

    return {"response": 200, "fridge": messageContent}
