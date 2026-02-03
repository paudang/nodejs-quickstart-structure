FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Build for production (TypeScript)
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
