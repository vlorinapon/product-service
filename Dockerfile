# Install dependencies
FROM node:18-alpine as builder
ARG NPM_TOKEN

##COPY .npmrc .npmrc
COPY package*.json ./
RUN npm ci --omit=dev

# Start the container
FROM node:18-alpine
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY --from=builder node_modules node_modules
USER node
COPY --chown=node:node . .
EXPOSE 3000

CMD [ "npm", "start" ]
