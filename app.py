from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return "Microserviço rodando!"

@app.route('/status')
def status():
    return jsonify({"status": "ok"})

@app.route('/info')
def info():
    return jsonify({"info": "ok"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)