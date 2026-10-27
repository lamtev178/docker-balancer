FROM node:20-alpine
RUN apk add --no-cache curl
WORKDIR /app
COPY server.js server.test.js ./ 
EXPOSE 3000
CMD ["node", "server.js"]
