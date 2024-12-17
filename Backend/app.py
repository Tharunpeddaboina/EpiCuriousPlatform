from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Secret key for sessions
app.secret_key = '12345'

# MongoDB connection setup
client = MongoClient('mongodb://localhost:27017/')
db = client['recipes']
users_collection = db['users']
recipes_collection = db['data']

# Setup Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# User model for Flask-Login
class User(UserMixin):
    def __init__(self, user_id, username, email):
        self.id = user_id
        self.username = username
        self.email = email

@login_manager.user_loader
def load_user(user_id):
    user = users_collection.find_one({'_id': ObjectId(user_id)})
    if user:
        return User(str(user['_id']), user['username'], user['email'])
    return None

def convert_objectid_to_str(data):
    """Convert ObjectId fields in a dictionary to strings."""
    if isinstance(data, list):
        return [convert_objectid_to_str(item) for item in data]
    elif isinstance(data, dict):
        return {k: (str(v) if isinstance(v, ObjectId) else convert_objectid_to_str(v)) for k, v in data.items()}
    return data

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({'error': 'Username, email, and password are required'}), 400

    # Check if user already exists
    if users_collection.find_one({'$or': [{'username': username}, {'email': email}]}):
        return jsonify({'error': 'User with this username or email already exists'}), 400

    # Create new user
    users_collection.insert_one({'username': username, 'email': email, 'password': password})
    return jsonify({'message': 'Registration successful'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    # Verify user
    user = users_collection.find_one({'email': email, 'password': password})
    if not user:
        return jsonify({'error': 'Invalid credentials'}), 401

    user_obj = User(str(user['_id']), user['username'], user['email'])
    login_user(user_obj)
    return jsonify({'message': 'Login successful', 'user': {'id': str(user['_id']), 'username': user['username'], 'email': user['email']}}), 200

@app.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logout successful'}), 200

@app.route('/search', methods=['GET'])
@login_required
def search():
    query = request.args.get('query')
    if not query:
        return jsonify({'error': 'No query provided'}), 400

    results = recipes_collection.find({"title": {"$regex": query, "$options": "i"}}).limit(15)
    results_list = [recipe for recipe in results]

    # Convert ObjectId to string
    results_list = convert_objectid_to_str(results_list)

    return jsonify(results_list), 200

if __name__ == '__main__':
    app.run(debug=True)
