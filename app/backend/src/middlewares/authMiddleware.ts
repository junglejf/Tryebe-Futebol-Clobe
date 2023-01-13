import { NextFunction, Response, Request } from 'express';
import Jwt = require('jsonwebtoken');
import { RequestCustom } from '../interfaces/customRequest';
import throwError from '../helpers/throwError';
import LoginService from '../services/loginService';
import { Payload } from '../interfaces/authInterface';

const validateToken = async (request:Request, _res: Response, next:NextFunction) => {
  const req = request as RequestCustom;
  const token = request.headers.authorization;
  const secret = process.env.JWT_SECRET || 'secret';
  if (!token) throwError.unathorized('Token must be a valid token');
  console.log('AUTHMIDLLEWARE', req.path);
  try {
    const payload = Jwt.verify(token as string, secret) as Payload;
    console.log('payload', payload);
    if (req.path === '/validate') {
      const user = await LoginService.validateUser(payload.data);
      console.log('user', user);
      if (!user) throwError.unathorized('usuário inválido');
      req.body.user = user;
      // console.log('CHWGOU >>>>>>>>>>>>>>>>>>>>>>', req.path);
    }
    next();
  } catch (err) {
    throwError.unathorized('Token must be a valid token');
  }
};

export default validateToken;
