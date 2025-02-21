# Use a lightweight Python image
FROM python:3.9

# Set working directory
WORKDIR /model

# Copy files and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN curl -fsSL https://ollama.com/install.sh | sh

# Copy the rest of the backend code
COPY . .

# Expose the port Flask runs on
EXPOSE 5000
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "model:app", "--timeout", "90"]
