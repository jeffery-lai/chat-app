# Chat App

Run a simple LLM-powered chat interface on your own machine!

## Getting Started
To start the app, run the following commands at the project root:

```
docker compose up -d
```
```
./setup_model.sh
```
This will pull and set up the Llama 3.2 model from Ollama automatically.

## Using a Different Model
If you would like to use a different model:

 1. Modify the default model in:
   * `/model/model.py`
   * `setup_model.sh`
 1. Remove any old Docker images
 1. Rebuild the containers using the original steps
