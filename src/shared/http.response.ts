import { Response } from "express";

export enum HttpStatus {
    OK = 200,
    NOT_FOUND = 404,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    INTERNAL_SERVER_ERROR = 500,
}

export class HttpResponse {
    Ok(res: Response, data?: any): Response {
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            statusMsg: "Success",
            data: data,
            error: null
        });
    }

    NotFound(res: Response, error = "Not Found"): Response {
        // NotFound(res: Response, error?: any ): Response {
        return res.status(HttpStatus.NOT_FOUND).json({
            status: HttpStatus.NOT_FOUND,
            statusMsg: "Not Found",
            error: error,
            data: null
        });
    }

    Unauthorized(res: Response, error?: any): Response {
        return res.status(HttpStatus.UNAUTHORIZED).json({
            status: HttpStatus.UNAUTHORIZED,
            statusMsg: "Unauthorized",
            error: error,
            data: null
        });
    }

    Forbidden(res: Response, error?: any): Response {
        return res.status(HttpStatus.FORBIDDEN).json({
            status: HttpStatus.FORBIDDEN,
            statusMsg: "Forbidden",
            error: error,
            data: null
        });
    }

    Error(res: Response, error?: any): Response {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            statusMsg: "Internal server error",
            error: error,
            data: null
        });
    }
}
