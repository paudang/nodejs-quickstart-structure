import { BadRequestError } from '@/errors/BadRequestError';
import { ApiError } from '@/errors/ApiError';
import { HTTP_STATUS } from '@/utils/httpCodes';
import { ERROR_MESSAGES } from '@/utils/errorMessages';

describe('BadRequestError', () => {
    it('should extend ApiError', () => {
        const error = new BadRequestError();
        expect(error).toBeInstanceOf(ApiError);
    });

    it('should have default message "Bad Request"', () => {
        const error = new BadRequestError();
        expect(error.message).toBe(ERROR_MESSAGES.BAD_REQUEST);
        expect(error.statusCode).toBe(HTTP_STATUS.BAD_REQUEST);
    });

    it('should accept a custom message', () => {
        const error = new BadRequestError('Custom bad request');
        expect(error.message).toBe('Custom bad request');
    });
});
