# Use Node.js LTS
FROM node:22-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose the port Express runs on
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]