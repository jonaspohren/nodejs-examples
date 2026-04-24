import express from 'express';

import * as userController from './controllers/user.controller.ts';

const port = 3000;
const app = express();

app.use(express.json());

app.get('/user', userController.getUsers);
app.post('/user', userController.saveUser);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
