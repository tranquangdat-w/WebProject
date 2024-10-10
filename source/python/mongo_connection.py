from pymongo import MongoClient


# Kết nối đến MongoDB
MONGO_DETAILS = 'mongodb://localhost:27017/?appName=MongoDB+Compass&directConnection=true&serverSelectionTimeoutMS=2000'
client = MongoClient(MONGO_DETAILS)
db = client['admin']
collection = db['products']
