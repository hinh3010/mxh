import { NextFunction, Request, Response } from "express";

const catchAsync = (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next))
        .catch((err) => {
            console.info(`
                [${new Date().toLocaleString()}] 
                Incoming ${req.method}${req.originalUrl} 
                Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}
                
                Message err ${err.message}
                Status err ${err.status}
            `);
            next(err)
        })
}

export default catchAsync