# base image
FROM node:12.18.0-alpine As build
# set working directory
WORKDIR /usr/src/app
# install and cache app dependencies
COPY package.json package-lock.json ./
RUN npm install
RUN npm install -g @angular/cli@9.1.8
COPY . .
RUN npm run build

FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build  /usr/src/app/dist/covid19 /usr/share/nginx/html
