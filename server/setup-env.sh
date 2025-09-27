#!/bin/bash

echo "🚀 Setting up Library Management System Environment..."

# Copy the development config to .env
cp .env.development .env

echo "✅ Environment file created!"

# Create uploads directory
mkdir -p uploads
echo "✅ Uploads directory created!"

# Check if MongoDB is running
if mongosh --eval "db.runCommand('ping')" > /dev/null 2>&1; then
    echo "✅ MongoDB is running!"
else
    echo "❌ MongoDB is not running. Please start MongoDB:"
    echo "   brew services start mongodb-community"
fi

# Check if Node.js dependencies are installed
if [ -d "node_modules" ]; then
    echo "✅ Node.js dependencies are installed!"
else
    echo "📦 Installing Node.js dependencies..."
    npm install
fi

echo ""
echo "🎉 Setup complete! Your environment is ready."
echo ""
echo "📋 Next steps:"
echo "1. Update .env file with your actual email credentials (optional)"
echo "2. Start the server: npm run dev"
echo "3. Run tests: npm test"
echo ""
echo "🌐 Your API will be available at: http://localhost:5000"
echo "📚 API Documentation: http://localhost:5000/api-docs"
