from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
from PIL import Image
import matplotlib.pyplot as plt
import mysql.connector
import nibabel as nib
import numpy as np
import base64
import io
import os

app = Flask(__name__)
CORS(app)

# connect to database
cnx = mysql.connector.connect(user='new_user', password='123456', host='49.234.34.44', database='class2')
cursor = cnx.cursor()

# print database connection info
print("Connected to MySQL database: {}".format(cnx.database))

def allowed_file(filename):
    return True

#...
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'message': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        return jsonify({'message': 'File uploaded successfully', 'filename': filename}), 200
#...


@app.route('/visualize/<filename>')
def visualize_file(filename):
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    img = nib.load(file_path)
    data = img.get_fdata()
    slice_0 = data[26, :, :]
    plt.imshow(slice_0, cmap="gray")
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    image = Image.open(buf)
    image.show()

    buf.seek(0)
    image_bytes = buf.read()
    base64_encoded_result_bytes = base64.b64encode(image_bytes)
    base64_encoded_result_str = base64_encoded_result_bytes.decode('ascii')
    return jsonify({'message': 'Visualization created', 'image': base64_encoded_result_str})

@app.route('/files/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

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
    app.config['UPLOAD_FOLDER'] = './uploads'  # you need to ensure this folder exists
    app.run(debug=True)

