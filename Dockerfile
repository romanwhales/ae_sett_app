FROM node

#set working directory
RUN mkdir /usr/src/settlement_app

WORKDIR /usr/src/settlement_app

# COPY ./package.json ./

COPY . .

#COPY all files from current directory to docker
# COPY . /usr/src/settlement_app

# WORKDIR /usr/src/settlement_app

#add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/settlement_app/node_modules/.bin:$PATH

#install and cache app dependencies
# RUN npm rebuild node-sass
RUN yarn

#start app
CMD [ "yarn","start" ]