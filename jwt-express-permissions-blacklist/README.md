# Node.js JWT Express Permissions Blacklist Example

```
export REDIS_HOST=
export REDIS_PORT=
```

```
yarn install
yarn start
```

```
curl -d "username=jonaspohren&password=jonaspohren" http://localhost:3000/login
curl -iH "Authorization: Bearer <TOKEN>" http://localhost:3000/me
curl -iH "Authorization: Bearer <TOKEN>" http://localhost:3000/logout
```