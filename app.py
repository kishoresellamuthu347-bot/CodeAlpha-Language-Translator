from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/translate", methods=["POST"])
def translate():

    data = request.get_json()

    text = data["text"]
    source = data["source"]
    target = data["target"]

    url = "http://127.0.0.1:5001/translate"

    payload = {
        "q": text,
        "source": source,
        "target": target,
        "format": "text"
    }

    response = requests.post(url, json=payload)

    result = response.json()

    translated_text = result["translatedText"]

    return jsonify({
        "translation": translated_text
    })


if __name__ == "__main__":
    app.run(debug=True)