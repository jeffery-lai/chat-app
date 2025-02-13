from flask import Flask, request, jsonify
from flask_cors import CORS
import ollama

app = Flask(__name__)
CORS(app)  # Allows frontend to communicate with backend

OLLAMA_MODEL = "llama3.2"
conversation_history = []

@app.route("/chat", methods=["POST"])
def chat():
    """ Receives user input and returns AI-generated response. """
    global conversation_history
    data = request.json
    user_input = data.get("message", "")

    if not user_input:
        return jsonify({"error": "No input provided"}), 400

    conversation_history.append({"role": "user", "content": user_input})

    response = ollama.chat(model=OLLAMA_MODEL, messages=conversation_history)
    system_response = response["message"]["content"]
    conversation_history.append({"role": "assistant", "content": system_response})

    return jsonify({"response": system_response})

if __name__ == "__main__":
    app.run(debug=True)
