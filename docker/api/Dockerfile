FROM node:16-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run clean
RUN npm run build

FROM node:16-alpine AS final
# ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder ./app/dist ./dist
COPY package.json .
COPY package-lock.json .
COPY ecosystem.config.js .
RUN npm install --omit=dev
RUN npm install pm2 -g
CMD ["pm2-runtime", "ecosystem.config.js"]
