#!/bin/sh

# Wait for database to be ready
echo "Waiting for database to be ready..."
while ! nc -z postgres 5432; do
  sleep 1
done
echo "Database is ready!"

# Create initial migration if it doesn't exist
if [ ! -d "prisma/migrations" ]; then
  echo "Creating initial migration..."
  npx prisma migrate dev --name init
else
  echo "Applying existing migrations..."
  npx prisma migrate deploy
fi

echo "Database initialization complete!"

# Start the application
echo "Starting application..."
exec npm start 