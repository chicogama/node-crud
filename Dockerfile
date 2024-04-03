FROM node:20-alpine
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY src/package.json package.json
COPY src/package-lock.json package-lock.json 
RUN npm install
COPY src/ .
EXPOSE 3333
CMD [ "npm", "run", "dev"]