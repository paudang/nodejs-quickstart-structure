import { ApiError } from '@/errors/ApiError';
import { HTTP_STATUS } from '@/utils/httpCodes';

export class NotFoundError extends ApiError {
  constructor(message = 'Resource not found') {
    super(HTTP_STATUS.NOT_FOUND, message);
  }
}
