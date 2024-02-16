# base image 설정(as build 로 완료된 파일을 밑에서 사용할 수 있다.)
FROM node:20 as build
LABEL authors="chnam"

WORKDIR /app
COPY package*.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn run build

FROM nginx:1.25.3-alpine-slim
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# nginx 서버를 실행하고 백그라운드로 동작하도록 한다.
CMD ["nginx", "-g", "daemon off;"]