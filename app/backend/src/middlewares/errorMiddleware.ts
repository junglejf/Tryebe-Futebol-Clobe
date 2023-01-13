import { NextFunction, Request, Response } from 'express';

const errors: Record< string, number> = {
  emptyFieldError: 400,
  invalidFieldError: 400,
  unauthorizedError: 401,
  doesntExistError: 404,
  NotFoundError: 404,
};

const formatErrorName = (error :Error) => {
  if (error.name === 'ValidationError') {
    return (error.message.includes('required')
      ? 'emptyFieldError' : 'invalidFieldError');
  }
  return error.name;
};

const errorMiddleware = (error : Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log(error);
  const name = formatErrorName(error);
  const { message } = error;
  console.log(name, errors[name]);
  const status = errors[name];
  if (!status) return res.sendStatus(500); // Error 500 verificar AQUI primeiro !!!!!!
  res.status(status).json({ message });
};

export default errorMiddleware;
