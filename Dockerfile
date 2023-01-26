FROM node:19-alpine3.16
RUN apk add --no-cache ffmpeg
WORKDIR /app
COPY . .
RUN mkdir -p input output
CMD ["node", "server.js"]
