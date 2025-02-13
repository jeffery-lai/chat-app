from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Allows frontend to communicate with backend

OLLAMA_MODEL = "llama3.2"

def generate_response(user_input):
    """ Sends input to Ollama and returns the response. """
    try:
        response = requests.post(
            "http://127.0.0.1:11434/api/generate",
            json={"model": OLLAMA_MODEL, "prompt": user_input, "stream": False},
        )
        response_json = response.json()
        return response_json["response"]
    except Exception as e:
        return f"Error generating response: {str(e)}"

@app.route("/chat", methods=["POST"])
def chat():
    """ Receives user input and returns AI-generated response. """
    data = request.json
    user_input = data.get("message", "")

    if not user_input:
        return jsonify({"error": "No input provided"}), 400

    system_response = generate_response(user_input)
    return jsonify({"response": system_response})

if __name__ == "__main__":
    app.run(debug=True)
