FROM node:20-alpine
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY src/package*.json ./
USER node
RUN npm install
COPY --chown=node:node . .
EXPOSE 3333
CMD [ "node", "server.js"]