FROM node:latest

RUN mkdir -p /code
WORKDIR /code

COPY package.json /code
RUN npm install

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
ADD https://s3.amazonaws.com/rds-downloads/rds-combined-ca-bundle.pem /rds-combined-ca-bundle.pem
RUN chmod +x /wait

COPY . /code
EXPOSE 80
CMD /wait && node app.js

