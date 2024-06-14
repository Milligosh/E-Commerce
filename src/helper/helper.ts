import { Response} from 'express'

export function responseProvider(res: Response, data: any, message: string, code: number): Response {
    return res.status(code).json({ message, data });
}

export interface ResponseObject {
    status: 'success' | 'failure';
    code: number;
    message: string;
    data: any;
}

 export function provideResponse(status: 'success' | 'failure', code: number, message: string, data: any): ResponseObject {
    return {
        status: status,
        code: code,
        message: message,
        data: data
    };
}
