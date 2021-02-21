const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();
const swaggerDocument = YAML.load('./swagger.yaml');

app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/user/:id', (req, res) => {
  res.json({ id: Number(req.params.id), name: 'John' });
});

app.post('/user', (req, res) => {
  res.json({ id: 1, ...req.body });
});

app.listen(3000, () => {
  console.log('Server running');
});
