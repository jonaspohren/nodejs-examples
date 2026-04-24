import { type Request, type Response } from 'express';

import { UserModel } from '../models/user.model.ts';
import * as userService from '../services/user.service.ts';

export function getUsers(req: Request, res: Response) {
  const users = userService.findUsers();

  res.status(200).json(users);
}

export function saveUser(req: Request, res: Response) {
  const user = new UserModel(req.body?.name);

  userService.saveUser(user);

  res.sendStatus(200);
}
