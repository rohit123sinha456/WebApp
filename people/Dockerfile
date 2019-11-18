FROM node
RUN mkdir -p /usr/src/people
WORKDIR /usr/src/people
COPY package.json /usr/src/people
RUN npm install
COPY . /usr/src/people
EXPOSE 3000
CMD ["npm","start"]