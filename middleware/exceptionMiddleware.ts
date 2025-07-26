import { Request, Response } from 'express';
import httpException from '../exceptions/httpException';

// err: httpException is custome error class passed from controller in next(new customException('message'))
export const exceptionMiddleware = (err: httpException, req: Request, res: Response, next: Function) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    
    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });
    
}