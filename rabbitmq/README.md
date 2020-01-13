# Node.js RabbitMQ Example

```
docker run -d -p 15672:15672 -p 5672:5672 rabbitmq:management-alpine
```
---

http://localhost:15672 \
guest \
guest

---

```
export RABBITMQ_URL=amqp://localhost:5672
```

```
yarn install
```

```
yarn run receive
yarn run send <MESSAGE>
```

```
yarn run subscribe
yarn run publish <MESSAGE>
```