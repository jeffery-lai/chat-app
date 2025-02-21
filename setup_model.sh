#!/bin/bash
docker exec -it -d chat-app-model-1 ollama serve
docker exec -it chat-app-model-1 ollama pull llama3.2
