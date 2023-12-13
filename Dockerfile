# Use an official Node.js runtime as the base image
FROM node:20.10-alpine

# Set the working directory in the container to /app
WORKDIR /app

# Install Doppler CLI
RUN apk add --no-cache curl && \
    curl -Ls https://cli.doppler.com/install.sh | sh

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 3000 for the application
EXPOSE 3000

# Define the command to run the application
CMD ["doppler", "run", "--", "npm", "start"]