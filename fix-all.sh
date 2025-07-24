#!/bin/bash

echo "🚀 Starting full project fix..."

### --- SERVER SETUP ---
echo "🧹 Cleaning server dependencies..."
rm -rf node_modules package-lock.json
echo "📦 Installing server dependencies..."
npm install

### --- CLIENT SETUP ---
echo "➡️  Moving to client folder..."
cd client || { echo "❌ client folder not found!"; exit 1; }

echo "🧹 Removing client node_modules and package-lock.json..."
rm -rf node_modules package-lock.json

echo "📦 Installing client dependencies..."
npm install --legacy-peer-deps

echo "🏗 Building React client..."
npm run build
cd ..

### --- CHECK MONGODB ---
echo "🔍 Checking if MongoDB is running..."
if ! pgrep -x "mongod" > /dev/null
then
    echo "❌ MongoDB is not running. Trying to start MongoDB via Homebrew..."
    brew services start mongodb-community || {
        echo "⚠️  Could not start MongoDB. Please start it manually and rerun this script."
        exit 1
    }
else
    echo "✅ MongoDB is running."
fi

### --- SEED DATABASE ---
echo "🌱 Seeding database..."
npm run seed:all

### --- START SERVER ---
echo "🚀 Starting backend server..."
npm run server
#!/bin/bash

echo "🚀 Starting full project fix..."

### --- SERVER SETUP ---
echo "🧹 Cleaning server dependencies..."
rm -rf node_modules package-lock.json
echo "📦 Installing server dependencies..."
npm install

### --- CLIENT SETUP ---
echo "➡️  Moving to client folder..."
cd client || { echo "❌ client folder not found!"; exit 1; }

echo "🧹 Removing client node_modules and package-lock.json..."
rm -rf node_modules package-lock.json

echo "📦 Installing client dependencies..."
npm install --legacy-peer-deps

echo "🏗 Building React client..."
npm run build

cd ..

### --- SEED DATABASE ---
echo "🌱 Seeding database..."
npm run seed:all

### --- START SERVER ---
echo "🚀 Starting backend server..."
npm run server


