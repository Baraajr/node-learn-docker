FROM node:18 as base

## u should specify the target stage from docker-compos file
FROM base as development
WORKDIR /app
COPY package*.json ./
RUN npm Install
COPY . .
EXPOSE 5500
CMD [ "npm", "run", "dev" ]

FROM base as production
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5500
CMD [ "npm", "run", "dev" ]
