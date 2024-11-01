from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})  # Allow requests from React app

# Connect to MongoDB Atlas
client = MongoClient(os.getenv('MONGO_URI', 'mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority'))
db = client.CSI  # database name
users = db.Members  # collection name

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    
    # Check if user already exists
    if users.find_one({'email': data['email']}):
        return jsonify({'error': 'Email already registered'}), 400
    
    # Create new user
    new_user = {
        'usn': data['usn'],
        'name': data['username'],  # Updated to match the form
        'email': data['email'],
        'password': data['password'],  # Use encryption or hashing in production!
        'role': data.get('role', 'nonmember'),  # Default to 'nonmember' if not provided
        'team': data.get('team', None)  # Optional, set to None if not provided
    }
    
    # Insert into database
    users.insert_one(new_user)
    
    return jsonify({
        'message': 'User created successfully',
        'email': new_user['email'],
    }), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    
    # Find user
    user = users.find_one({
        'email': data['email'],
        'password': data['password']  # Again, in real apps, never do direct password comparison!
    })
    
    if user:
        return jsonify({
            'message': 'Login successful',
            'email': user['email'],
        }), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

if __name__ == '__main__':
    app.run(debug=True)
