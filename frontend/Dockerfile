FROM node:20-alpine
USER 0
EXPOSE 3000
ENV PORT 3000

RUN npm config set loglevel verbose --global && npm set strict-ssl false --global
RUN apk add build-base cairo-dev pango-dev jpeg-dev giflib-dev librsvg-dev
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY . .
RUN npm install --force
RUN npm run build --force
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

CMD ["npm", "run", "dev"]
