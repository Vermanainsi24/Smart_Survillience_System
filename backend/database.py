from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["smart_surveillance"]
alerts_collection = db["alerts"]