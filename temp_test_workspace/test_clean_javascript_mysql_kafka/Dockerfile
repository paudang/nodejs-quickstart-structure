FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Build for production (TypeScript)


EXPOSE 3000

CMD ["npm", "start"]
