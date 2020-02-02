# Node.js JWT Example

```
ssh-keygen -t rsa -P "" -b 4096 -m PEM -f jwtRS256.key
ssh-keygen -e -m PEM -f jwtRS256.key > jwtRS256.key.pub
```

```
export JWT_PRIVATE_KEY=/path/to/jwtRS256.key
export JWT_PUBLIC_KEY=/path/to/jwtRS256.key.pub
```

```
yarn install
yarn start
```

```
curl -d "email=example@email.com&password=password" http://localhost:3000/api/auth/register
curl -d "email=example@email.com&password=password" http://localhost:3000/api/auth/login
curl -iH "Authorization: Bearer <TOKEN>" http://localhost:3000/api/auth/me
```

## Docker

```
docker-compose up --build
```

```
curl -d "email=example@email.com&password=password" http://localhost:3000/api/auth/register
curl -d "email=example@email.com&password=password" http://localhost:3000/api/auth/login
curl -iH "Authorization: Bearer <TOKEN>" http://localhost:3000/api/auth/me
```