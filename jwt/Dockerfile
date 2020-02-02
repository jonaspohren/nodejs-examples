FROM node:alpine
WORKDIR /var/www/app
COPY . .
RUN apk add openssh-keygen && \
    ssh-keygen -t rsa -P "" -b 4096 -m PEM -f $HOME/.ssh/jwtRS256.key && \
    ssh-keygen -e -m PEM -f $HOME/.ssh/jwtRS256.key > $HOME/.ssh/jwtRS256.key.pub && \
    apk add yarn && \
    yarn install
ENV JWT_PRIVATE_KEY=/root/.ssh/jwtRS256.key \
    JWT_PUBLIC_KEY=/root/.ssh/jwtRS256.key.pub
EXPOSE 3000
CMD ["yarn", "start"]