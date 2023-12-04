
FROM alpine
# Use the official Node.js image as the base image
RUN apk update
RUN apk add nodejs
RUN apk add npm

RUN mkdir /root/app
# Set the working directory in the container
WORKDIR /root/app

# Copy the application files into the working directory
COPY * /root/app

# Install the application dependencies
RUN npm install

EXPOSE 3000

# Define the entry point for the container
CMD npm start


