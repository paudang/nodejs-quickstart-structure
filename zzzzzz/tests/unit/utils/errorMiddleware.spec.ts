import { errorMiddleware } from '@/utils/errorMiddleware';
import { Request, Response } from 'express';
import { ApiError } from '@/errors/ApiError';
import { HTTP_STATUS } from '@/utils/httpCodes';
import logger from '@/infrastructure/log/logger';

jest.mock('@/infrastructure/log/logger');

describe('Error Middleware', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: jest.Mock;
    const originalEnv = process.env.NODE_ENV;

    beforeEach(() => {
        mockRequest = {
            originalUrl: '/test',
            method: 'GET',
            ip: '127.0.0.1'
        };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        nextFunction = jest.fn();
        jest.clearAllMocks();
    });

    afterEach(() => {
        process.env.NODE_ENV = originalEnv;
    });

    it('should handle standard Error by wrapping it in a 500 ApiError', () => {
        const error = new Error('Standard Error');
        errorMiddleware(error, mockRequest as Request, mockResponse as Response, nextFunction);

        expect(logger.error).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(HTTP_STATUS.INTERNAL_SERVER_ERROR);
        expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
            statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Standard Error'
        }));
    });

    it('should default to Internal Server Error message if none provided on Error', () => {
        const error = new Error();
        errorMiddleware(error, mockRequest as Request, mockResponse as Response, nextFunction);

        expect(mockResponse.status).toHaveBeenCalledWith(HTTP_STATUS.INTERNAL_SERVER_ERROR);
        expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
            message: 'Internal Server Error'
        }));
    });

    it('should handle custom ApiError directly', () => {
        const customError = new ApiError(HTTP_STATUS.BAD_REQUEST, 'Bad Request Data', true);
        errorMiddleware(customError, mockRequest as Request, mockResponse as Response, nextFunction);

        expect(logger.error).not.toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
        expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
            statusCode: HTTP_STATUS.BAD_REQUEST,
            message: 'Bad Request Data'
        }));
    });

    it('should include stack trace in development environment', () => {
        process.env.NODE_ENV = 'development';
        const error = new Error('Test Error');
        errorMiddleware(error, mockRequest as Request, mockResponse as Response, nextFunction);

        expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
            stack: expect.any(String)
        }));
    });

    it('should omit stack trace in production environment', () => {
        process.env.NODE_ENV = 'production';
        const error = new Error('Test Error');
        errorMiddleware(error, mockRequest as Request, mockResponse as Response, nextFunction);

        const jsonArg = (mockResponse.json as jest.Mock).mock.calls[0][0];
        expect(jsonArg.stack).toBeUndefined();
    });

    it('should handle error without stack trace', () => {
        const customError = new ApiError(HTTP_STATUS.INTERNAL_SERVER_ERROR, 'No Stack', false);
        delete customError.stack;
        errorMiddleware(customError, mockRequest as Request, mockResponse as Response, nextFunction);

        expect(logger.error).toHaveBeenCalledWith(expect.stringContaining('No Stack'));
        expect(logger.error).toHaveBeenCalledWith('No stack trace');
    });
});
