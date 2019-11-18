FROM node
RUN mkdir -p /usr/src/admin
WORKDIR /usr/src/admin
COPY package.json /usr/src/admin
RUN npm install
COPY . /usr/src/admin
EXPOSE 3001
CMD ["npm","start"]
