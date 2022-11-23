FROM node:16.14-alpine
WORKDIR /app-backend

COPY package.json package-lock.json /app-backend/
RUN ls && ls /
RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]