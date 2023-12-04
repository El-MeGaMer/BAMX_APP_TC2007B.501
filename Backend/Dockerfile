
# Use the official Node.js image as the base image
FROM node:21

# Set the working directory in the container
WORKDIR /app

# Copy the application files into the working directory
COPY . /app

# Install the application dependencies
RUN npm install

ENV PORT 3000

EXPOSE 3000


# Define the entry point for the container
CMD ["npm", "start"]

