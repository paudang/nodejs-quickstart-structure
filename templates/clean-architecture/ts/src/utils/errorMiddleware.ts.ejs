import { Request, Response } from 'express';
import logger from '@/infrastructure/log/logger';
import { ApiError } from '@/errors/ApiError';
import { HTTP_STATUS } from '@/utils/httpCodes';

export const errorMiddleware = (err: Error, req: Request, res: Response, _next: unknown) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;
    const message = error.message || 'Internal Server Error';
    error = new ApiError(statusCode, message, false, err.stack);
  }

  const { statusCode, message } = error as ApiError;

  if (statusCode === HTTP_STATUS.INTERNAL_SERVER_ERROR) {
    logger.error(`${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    logger.error(error.stack || 'No stack trace');
  }

  res.status(statusCode).json({
    statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  });
};
