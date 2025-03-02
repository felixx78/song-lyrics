FROM node:20

RUN apt-get update && apt-get install -y \
    xvfb \
    chromium \
    libx11-dev \
    libxext6 \
    libxi6 \
    libxrender1 \
    && rm -rf /var/lib/apt/lists/*

ENV CHROME_PATH=/usr/bin/chromium

ARG GENIUS_SECRET
ENV GENIUS_SECRET=${GENIUS_SECRET}

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"]
