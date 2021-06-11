FROM node:14

# create destination directory
RUN mkdir -p /usr/src/nvstr-app
WORKDIR /usr/src/nvstr-app

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /usr/src/nvstr-app/
RUN yarn

# build necessary, even if no static files are needed,
# since it builds the server as well
RUN yarn build

# expose 4444 on container
EXPOSE 4444

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=4444

# start the app
CMD [ "yarn", "start" ]
