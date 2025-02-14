from flask import Flask, request, Response
from flask_cors import CORS
import ollama

app = Flask(__name__)
CORS(app)  # Allows frontend to communicate with backend

OLLAMA_MODEL = "llama3.2"

def generate_response(prompt):
    stream = ollama.chat(model=OLLAMA_MODEL, messages=prompt, stream=True)  
    for chunk in stream:
        yield chunk["message"]["content"]

@app.route("/chat", methods=["POST"])
def chat():
    """ Receives user input and returns AI-generated response. """
    data = request.json
    messages = data.get("messages", [])

    return Response(generate_response(messages), content_type="text/plain")

if __name__ == "__main__":
    app.run(debug=True)
