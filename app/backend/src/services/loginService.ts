import Joi = require('joi');
import Jwt = require('jsonwebtoken');
// import { compare } from 'bcryptjs';
import * as bcrypt from 'bcryptjs';
import { IUser } from '../interfaces/userInterface';
import throwError from '../helpers/throwError';
import User from '../database/models/user';

const SECRET = process.env.JWT_SECRET || 'secret';
const joiMsg = 'All fields must be filled';
const empty = {
  email: { 'string.empty': joiMsg, 'any.required': joiMsg },
  password: { 'string.empty': joiMsg, 'any.required': joiMsg },
};

class LoginService {
  static async validateBodyLogin(body : IUser) {
    console.log('validateBodyLogin', body);
    const schema = Joi.object({
      email: Joi.string().required().messages(empty.email),
      password: Joi.string().required().messages(empty.password),
    });

    const result = await schema.validateAsync(body);
    return result;
  }

  static async validateUser(userInfo : IUser) {
    // console.log('validateUser', userInfo);
    const { email, password } = userInfo;
    const user = await User.findOne({ where: { email }, raw: true }) as User;
    // console.log('data', user);

    if (!user) throwError.invalidUser('Incorrect email or password');

    const verifyUserPass = await bcrypt.compare(password, user.password);
    console.log('verifypass:', verifyUserPass);
    if (!verifyUserPass) throwError.invalidUser('Incorrect email or password');

    return { ...user, ...userInfo };
  }

  static async loginToken(userInfo : IUser) {
    const token = Jwt.sign({ data: userInfo }, SECRET);
    console.log('tkoen L45', token);
    return token;
  }
}

export default LoginService;
