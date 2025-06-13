FROM node:alpine as builder
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

FROM ubuntu
RUN apt-get update
RUN apt-get install nginx -y
COPY --from=builder /app/dist /var/generator/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
