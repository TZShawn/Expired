from json import dump
from flask import Blueprint, jsonify, request

from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

from dotenv import load_dotenv
import os

load_dotenv()

uri = os.getenv("MONGO_PASSWORD")

client = MongoClient(uri, server_api=ServerApi('1'))

accounts_bp = Blueprint("accounts", __name__)

@accounts_bp.route('/signup', methods=['POST'])
def signup():
  body = request.json

  body['fridge'] = []

  db = client['ExpiredDB']
  collection = db['Accounts']
  print(body)
  res = str(collection.insert_one(body).inserted_id)

  # print(result)

  return {"message": res}

@accounts_bp.route('/signin')
def signin():

  body = request.args.get('username')
  print(body)
  if body == None:
    return {'response': 404, 'message': 'no body specified'}

  db = client['ExpiredDB']
  collection = db['Accounts']

  query = {'username': body}
  
  document = collection.find_one(query)

  if document == None:
    return {'respose': 404, 'message': 'does not exist'}

  document['_id'] = str(document['_id'])

  return document