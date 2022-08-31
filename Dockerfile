FROM node

WORKDIR /usr/src/app/

COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/

RUN yarn --foline --fronze-lockfile --link-duplicates

COPY . .

RUN yarn build

EXPOSE 3333

