#!/bin/bash

# Start the development server in the background
echo "Starting Next.js development server..."
npm run dev -- --port 3000 &
SERVER_PID=$!

# Wait for the server to start
echo "Waiting for server to start..."
sleep 10

# Run the E2E tests
echo "Running E2E tests..."
npm run test:e2e

# Capture the test result
TEST_RESULT=$?

# Kill the server process
echo "Shutting down server..."
kill $SERVER_PID

# Exit with the test result
exit $TEST_RESULT