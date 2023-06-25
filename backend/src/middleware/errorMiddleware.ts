import { Request, Response, NextFunction } from 'express';

// 404 error creator
const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

//error handling middleware - catches all errors
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = (res.statusCode = 200 ? 500 : res.statusCode);
  res.status(statusCode).json({
    url: req.originalUrl,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
  next();
};

export { notFound, errorHandler };
