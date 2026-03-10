import { ApiError } from '@/errors/ApiError';
import { HTTP_STATUS } from '@/utils/httpCodes';

export class BadRequestError extends ApiError {
  constructor(message = 'Bad request') {
    super(HTTP_STATUS.BAD_REQUEST, message);
  }
}
