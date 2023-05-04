# Set the base image to the official Node.js image
FROM node:16-alpine

# Create a directory for your app
WORKDIR /app

# Copy your package.json and package-lock.json files to the app directory
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy the rest of your app's source code to the app directory
COPY . .

# Expose the port that your app listens on
EXPOSE 3000

# Start your app
CMD ["npm", "start"]