# Use an official Node.js runtime as a parent image
FROM node:latest as build

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the ReactJS application
RUN npm run build

# Use a lightweight web server to serve the built React app
FROM nginx:alpine

# Copy the built React app from the previous stage to the web server directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 3000 to the outside world
EXPOSE 80

# Command to start the web server
CMD ["nginx", "-g", "daemon off;"]
