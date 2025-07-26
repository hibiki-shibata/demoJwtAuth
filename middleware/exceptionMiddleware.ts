import { Request, Response } from 'express';
import httpException from '../exceptions/httpException';

// err: httpException is custome error class passed from controller in next(new customException('message'))
export const exceptionMiddleware = (err: Error, req: Request, res: Response, next: Function) => {
    let statusCode: number;
    let message: string;

    if (!(err instanceof httpException)) {
        statusCode = 500;
        message = 'Internal Server Error';
    } else {
        statusCode = err.statusCode || 500;
        message = err.message || 'An error occurred';
    }

    // const statusCode = isHttpException.statusCode ? err.statusCode : 500;
    // const message = isHttpException.message || 'Internal Server Error';

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });

}