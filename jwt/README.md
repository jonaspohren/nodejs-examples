# Node.js JWT Example

```
yarn install
yarn start
```

```
export JWT_SECRET=secret
export MONGODB_URI=mongodb://localhost/my_db
```

```
curl -d "email=example@email.com&password=password" http://localhost:3000/api/auth/register
curl -d "email=example@email.com&password=password" http://localhost:3000/api/auth/login
curl -H "x-access-token: TOKEN" http://localhost:3000/api/auth/me
```