FROM node:latest AS builder

WORKDIR /web-ui

COPY . . 

RUN ls -la /
RUN npm install
RUN npm run build

FROM node:latest AS runner

WORKDIR /web-ui

COPY --from=builder /web-ui/.next /web-ui/.next
COPY --from=builder /web-ui/package.json /web-ui

RUN npm install

CMD npm run start
