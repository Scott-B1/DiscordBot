# syntax=docker/dockerfile:1
FROM node
COPY src/. /app
CMD node /app/mybot.js
