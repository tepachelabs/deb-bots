# Use an official Node.js runtime as the base image
FROM node:20.10-alpine

ARG GIT_COMMIT
ENV GIT_COMMIT=$GIT_COMMIT

ARG DOPPLER_TOKEN
ENV DOPPLER_TOKEN=$DOPPLER_TOKEN

# Set the working directory in the container to /app
WORKDIR /app

# Update and install dependencies
# Add Doppler's RSA key
RUN wget -q -t3 'https://packages.doppler.com/public/cli/rsa.8004D9FF50437357.key' -O /etc/apk/keys/cli@doppler-8004D9FF50437357.rsa.pub

# Install Doppler CLI
# Add Doppler's apk repo
RUN echo 'https://packages.doppler.com/public/cli/alpine/any-version/main' | tee -a /etc/apk/repositories
RUN apk update && apk add --no-cache libffi-dev openssl-dev build-base curl doppler

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Production environment
ENV NODE_ENV=production

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 3000 for the application
EXPOSE 3000

# Define the command to run the application
CMD ["doppler", "run", "--", "npm", "start"]
