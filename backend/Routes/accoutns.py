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

  res = str(collection.insert_one(body).inserted_id)

  return {"message": res}

@accounts_bp.route('/getuser')
def getAccount():
  body = request.args.get('username')

  query = {'username': body}
  
  db = client['ExpiredDB']
  collection = db['Accounts']
  document = collection.find_one(query)
  document['_id'] = str(document['_id'])

  return document

@accounts_bp.route('/signin')
def signin():

  body = request.args.get('username')
  if body == None:
    return {'response': 404, 'message': 'no body specified'}

  db = client['ExpiredDB']
  collection = db['Accounts']

  query = {'username': body}
  
  document = collection.find_one(query)

  if document == None:
    return {'respose': 404, 'message': 'does not exist'}

  document['_id'] = str(document['_id'])
  
  if (body["password"] != document['password']): 
    return {"response": 400, 'message': 'Password incorrect'}
  else:
    return {'response': 200, 'message': 'Passoword Correct'}
  