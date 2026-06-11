import { ApiError } from '@/errors/ApiError';
import { HTTP_STATUS } from '@/utils/httpCodes';
import { ERROR_MESSAGES } from '@/utils/errorMessages';

export class BadRequestError extends ApiError {
  constructor(message: string = ERROR_MESSAGES.BAD_REQUEST) {
    super(HTTP_STATUS.BAD_REQUEST, message);
  }
}
