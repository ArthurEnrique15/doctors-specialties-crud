FROM node

RUN mkdir -p /home/root/api_test_gcb/node_modules && chown -R root:root /home/root/api_test_gcb

WORKDIR /home/root/api_test_gcb

COPY package.json yarn.* ./

USER root

RUN yarn

COPY --chown=root:root . .

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

EXPOSE 3333

CMD ["yarn", "run", "dev"];