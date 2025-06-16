#!/bin/bash

# Start the presentation app
echo "🎬 Starting presentation app..."

# Check if we're in the correct directory
if [ ! -d "presentation-app" ]; then
    echo "❌ Error: presentation-app directory not found."
    echo "Please make sure you're running this script from the project root."
    exit 1
fi

# Navigate to the presentation app directory
cd presentation-app

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the development server
echo "🚀 Starting development server..."
echo "The presentation will be available at http://localhost:3000"
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev 