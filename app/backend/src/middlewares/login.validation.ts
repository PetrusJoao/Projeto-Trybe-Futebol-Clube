import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';
import * as Bcrypt from 'bcryptjs';
import UserModel from '../database/models/UserModel';
import { UserInterface } from '../interfaces/user.interface';

const userSchema = Joi.object<UserInterface>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}).messages({
  'string.empty': 'All fields must be filled',
  'any.required': '{{#label}} is required',
});

const emailValidation = async (req: Request, res: Response, next: NextFunction) => {
  const login = req.body;
  const { error } = userSchema.validate({ email: login.email, password: login.password });
  console.log(error);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  const { email } = login;
  const verifyEmail = await UserModel.findOne({ where: { email } });
  if (!verifyEmail) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  next();
};
const passwordValidation = async (req: Request, res: Response, next: NextFunction) => {
  const login = req.body;
  const { error } = userSchema.validate({ email: login.email, password: login.password });
  console.log(error);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  const { email, password } = login;
  const verifyEmail = await UserModel.findOne({ where: { email } });

  if (!Bcrypt.compareSync(password, verifyEmail?.password as string)) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  next();
};

export { emailValidation, passwordValidation };

//   const login = req.body;
//   const { email, password } = login;
//   const passwordMinLength = 6;
//
//   if (!email || !password || password.length < passwordMinLength) {
//     return res.status(400).json({ message: 'All fields must be filled' });
//   }
