# Use official Node.js image as base
FROM node:lts

# Create app directory
WORKDIR /usr/src/index

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# In production, you might want to:
# COPY .env.production .env

EXPOSE ${PORT}


CMD ["npm", "run", "dev"]
