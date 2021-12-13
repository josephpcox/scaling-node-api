FROM node:16.13.1-alpine3.14
WORKDIR /app
COPY . .
RUN npm install && run build
CMD ["node","serve.js"]