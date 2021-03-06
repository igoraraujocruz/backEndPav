import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import routes from './routes';
import uploadConfig from '@config/upload';
import { Request, Response, NextFunction } from 'express';
import AppError from '@shared/erros/AppError';
import cors from 'cors';
import '@shared/container';


import '../typeorm';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, request:Request, response:Response, next:NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: 'err.message',
        });
    };

    console.error(err);

    return response.status(500).json({
        status: 'error',
        message: 'Erro Interno'
    });

});

app.listen(3333, () => {
    console.log('Server started on port 3333.')
});