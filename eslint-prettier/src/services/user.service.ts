import type { UserModel } from '../models/user.model.ts';

export const users: UserModel[] = [];

export function findUsers() {
  return users;
}

export function saveUser(user: UserModel) {
  users.push(user);
}
