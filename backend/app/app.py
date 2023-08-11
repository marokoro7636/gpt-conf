from flask import Flask

app = Flask(__name__)

@app.route("/")
def index():
    return "GPT CONF Flask"

if __name__  == "__main__":
    app.run(debug=False, host='0.0.0.0', port=5555)