FROM node:18

WORKDIR /app

COPY package*.json ./

# Declare the build-time ARG
ARG NODE_ENV

# Install deps based on NODE_ENV
RUN echo "NODE_ENV is $NODE_ENV" && \
  if [ "$NODE_ENV" = "production" ]; then \
  npm ci --only=production; \
  else \
  npm ci; \
  fi

COPY . .

EXPOSE 5500

CMD [ "npm", "run", "dev" ]