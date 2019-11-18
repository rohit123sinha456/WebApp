FROM node
RUN mkdir -p /usr/src/task
WORKDIR /usr/src/task
COPY package.json /usr/src/task
RUN npm install
COPY . /usr/src/task
EXPOSE 3000
CMD ["npm","start"]