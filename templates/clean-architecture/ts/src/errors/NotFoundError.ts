import { ApiError } from '@/errors/ApiError';
import { HTTP_STATUS } from '@/utils/httpCodes';
import { ERROR_MESSAGES } from '@/utils/errorMessages';

export class NotFoundError extends ApiError {
  constructor(message: string = ERROR_MESSAGES.RESOURCE_NOT_FOUND) {
    super(HTTP_STATUS.NOT_FOUND, message);
  }
}
