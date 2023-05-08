from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

users = []

# connect to database
cnx = mysql.connector.connect(user='new_user', password='123456', host='49.234.34.44', database='class2')
cursor = cnx.cursor()

# print database connection info
print("Connected to MySQL database: {}".format(cnx.database))

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # check if user already exists in the database
    cursor.execute("SELECT * FROM Users WHERE username=%s", (username,))
    user = cursor.fetchone()
    if user:
        return jsonify({'message': 'User already exists'}), 400

    # insert new user into the database
    cursor.execute("INSERT INTO Users (username, password) VALUES (%s, %s)", (username, password))
    cnx.commit()
    return jsonify({'message': 'Registration successful'})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # check if user exists in the database and password matches
    cursor.execute("SELECT * FROM Users WHERE username=%s AND password=%s", (username, password))
    user = cursor.fetchone()
    if user:
        return jsonify({'message': 'Login successful', 'user': {'username': user[1]}})

    return jsonify({'message': 'Invalid credentials'}), 401


if __name__ == '__main__':
    app.run(debug=True)
