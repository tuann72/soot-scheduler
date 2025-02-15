from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return "Hello, Flask!"

@app.route('/classes', methods=['GET'])
def classes():
    return jsonify({"message": "Here is some data", "status": "success"})

if __name__ == '__main__':
    app.run(debug=True)
