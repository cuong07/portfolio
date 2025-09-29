#!/bin/bash

# Docker commands for portfolio application

# Function to cleanup existing container
cleanup_container() {
    if docker ps -a --format "table {{.Names}}" | grep -q "^portfolio-container$"; then
        echo "Cleaning up existing container..."
        docker stop portfolio-container 2>/dev/null
        docker rm portfolio-container 2>/dev/null
        echo "Existing container cleaned up."
    fi
}

# Build the Docker image
echo "Building Docker image..."
docker build -t portfolio-app .

if [ $? -ne 0 ]; then
    echo "Docker build failed!"
    exit 1
fi

# Check if .env file exists and source it
if [ -f .env ]; then
    echo "Loading environment variables from .env file..."
    export $(cat .env | grep -v '^#' | xargs)
else  
    echo "Warning: .env file not found!"
fi

# Validate required environment variables
if [ -z "$OPENAI_API_KEY" ]; then
    echo "Error: OPENAI_API_KEY is not set!"
    echo "Please make sure you have a .env file with OPENAI_API_KEY"
    exit 1
fi

if [ -z "$OPENAI_ASSISTANT_ID" ]; then
    echo "Error: OPENAI_ASSISTANT_ID is not set!"
    echo "Please make sure you have a .env file with OPENAI_ASSISTANT_ID"
    exit 1
fi

# Cleanup existing container
cleanup_container

# Run the container with port mapping 3000:8088 and environment variables
echo "Running container on port 8088..."
echo "OpenAI API Key: ${OPENAI_API_KEY:0:10}..."
echo "OpenAI Assistant ID: ${OPENAI_ASSISTANT_ID}"

# Run container with environment variables
docker run -d -p 8088:3000 \
  --name portfolio-container \
  -e OPENAI_API_KEY="${OPENAI_API_KEY}" \
  -e OPENAI_ASSISTANT_ID="${OPENAI_ASSISTANT_ID}" \
  portfolio-app

echo "Application is running at http://localhost:8088"
echo ""
echo "Useful commands:"
echo "  Stop container:    docker stop portfolio-container"
echo "  Remove container:  docker rm portfolio-container"
echo "  View logs:         docker logs portfolio-container"
echo "  View running containers: docker ps"