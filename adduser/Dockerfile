FROM node
RUN mkdir -p /usr/src/adduser
WORKDIR /usr/src/adduser
COPY package.json /usr/src/adduser
RUN npm install
COPY . /usr/src/adduser
EXPOSE 3000
CMD ["npm","start"]