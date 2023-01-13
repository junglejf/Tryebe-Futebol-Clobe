import { Request } from 'express';
import { IUser } from './userInterface';

export interface RequestCustom extends Request {
  user: IUser,
  authorization?: string,
}
// personalizando objeto Request do express para aceitar novos parâmetros
// https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript
