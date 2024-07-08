FROM node:20.14.0-alpine as build
WORKDIR /tmp

ENV NODE_ENV=testing
ENV NODE_OPTIONS=--max-old-space-size=8192
COPY package.json /tmp/
RUN npm install --frozen-lockfile
COPY . /tmp/
RUN yarn build

FROM registry.neo.vn/repository/nginx:alpine
COPY --from=build /tmp/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
