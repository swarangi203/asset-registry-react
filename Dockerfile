ARG REPO=220052277279.dkr.ecr.us-east-1.amazonaws.com/node:latest
FROM node:latest
FROM ${REPO}/node:latest    
#baseImage  

WORKDIR '/client'
#the directory to work on, it will be created if not available

COPY package.json ./
COPY package-lock.json ./
#copy package.json to the current directory that is '/app'

RUN npm install
#install all the dependancies for node to run

COPY . .
#copy everything from the current directory to the container

CMD [ "npm", "run", "start" ]
#commands to execute after the container is deployed


