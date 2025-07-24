#!/bin/bash

echo "🚀 Starting client fix script..."

# Navigate to client folder
cd client || { echo "❌ client folder not found!"; exit 1; }

echo "🧹 Removing old node_modules and package-lock.json..."
rm -rf node_modules package-lock.json

echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

echo "🏗 Building React app..."
npm run build

echo "✅ Client build complete!"

