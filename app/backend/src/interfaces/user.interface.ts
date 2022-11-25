import { Request } from 'express';

export interface UserInterface {
  id?: number,
  username: string,
  role: string,
  email: string,
  password: string,
}

export interface RequestInterface extends Request {
  email: string,
  password: string,
}
