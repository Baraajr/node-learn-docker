## this is a solution for multiple environment

we used one Dockerfile

to specify whether we will install all dependecies or production dependencies

# it will read this ARG from docker-compos file

# Declare the build-time ARG

ARG NODE_ENV

# Install deps based on NODE_ENV

RUN echo "NODE_ENV is $NODE_ENV" && \
  if [ "$NODE_ENV" = "production" ]; then \
 npm ci --only=production; \
 else \
 npm ci; \
 fi
