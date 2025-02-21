from flask import Flask, request, Response
from flask_cors import CORS
import ollama

app = Flask(__name__)
CORS(app)
OLLAMA_MODEL = "llama3.2"

def generate_response(prompt):
    stream = ollama.chat(model=OLLAMA_MODEL, messages=prompt, stream=True)  
    for chunk in stream:
        yield chunk["message"]["content"]

@app.route("/chat", methods=["POST"])
def chat():
    """ Receives user input and returns AI-generated response. """
    data = request.json
    if not data or "messages" not in data:
        return {"error": "Invalid request. 'messages' key required"}, 400
    
    messages = data.get("messages", [])

    response = Response(generate_response(messages), content_type="text/plain")
    return response

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
