FROM node:14
WORKDIR /koji-tests/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
RUN npm run build
CMD ["node", "dist/main.js"]