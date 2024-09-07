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

fridge_bp = Blueprint("fridge", __name__)


@fridge_bp.route("/addfridge", methods=["POST"])
def addFridge():
    body = request.json

    db = client["ExpiredDB"]
    collection = db["Accounts"]
    foodCollection = db['Foods']
    document = collection.find_one({"username": body["username"]})

    userFridge = document["fridge"]

    newItems = body["newItems"]
    print(newItems)


    openAIClient = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    for item in newItems:
        
        expiryTime = foodCollection.find_one({"name": item["name"]})
        
        foodExpiry = 0
        if expiryTime == None:

          completion = openAIClient.chat.completions.create(
              model="gpt-3.5-turbo",
              messages=[
                  {
                      "role": "system",
                      "content": "You are acting as a database that contains expiry dates of foods. You will be receiving inputs of a food and you have to reply with one line in the form of <food name>: <Average expiry time in days>.",
                  },
                  {
                      "role": "user",
                      "content": item["name"]
                  },
              ],
          )

          foodName = completion.choices[0].message.content.split(' ')[0]
          print(completion.choices[0].message.content)
          
          if foodCollection.find_one({"name": foodName}) == None:
            numberDate = completion.choices[0].message.content.split(' ')[-2].split("-")[-1]
            dateUnit = completion.choices[0].message.content.split(' ')[-1]
            if 'week' in dateUnit or 'Week' in dateUnit:
               numberDate = str(int(numberDate) * 7)
            elif 'month' in dateUnit or 'Month' in dateUnit:
               numberDate = str(int(numberDate) * 30)
            elif 'year' in dateUnit or 'Year' in dateUnit:
               numberDate = str(int(numberDate) * 365) 

            foodCollection.insert_one({"name": foodName.replace(':', ''), "expiryTime": numberDate})
            print(numberDate)
            foodExpiry = int(numberDate)
        else:
            print("RAN")
            print(expiryTime["expiryTime"])
            foodExpiry = int(expiryTime["expiryTime"])


        print(foodExpiry)
        userFridge.append(
            {
                "name": item["name"],
                "purchaseDate": datetime.strptime(item["purchaseDate"], "%B-%d-%Y"),
                "expiry": datetime.strptime(item["purchaseDate"], "%B-%d-%Y") + timedelta(days=foodExpiry)
            }
        )

    collection.update_one(
        {"username": document["username"]}, {"$set": {"fridge": userFridge}}
    )

    return {"response": 200, "fridge": userFridge}


@fridge_bp.route("/clearFridge", methods=["POST"])
def clearFridge():
    body = request.json

    db = client["ExpiredDB"]
    collection = db["Accounts"]

    document = collection.find_one({"username": body["username"]})
    collection.update_one({"username": document["username"]}, {"$set": {"fridge": []}})

    return {"response": 200, 'message': 'Fridge Cleared'}


# @fridge_bp.route("/removeItem", methods=["POST"])
# def clearFridge():
#     body = request.json

#     db = client["ExpiredDB"]
#     collection = db["Accounts"]

#     document = collection.find_one({"username": body["username"]})
#     collection.update_one({"username": document["username"]}, {"$set": {"fridge": []}})

#     return {"response": 200}
