import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import { ROLE_TYPE } from '../../types/enumTypes';
import { UserEntity } from './../../apis/user/user.entity';


export class CheckRole {
    constructor() {

    }

    asAdmin(req: Request, res: Response, next: NextFunction) {
        const { role } = req.user as UserEntity;
        if (role === ROLE_TYPE.USER) {
            next();
        } else {
            throw createError.Unauthorized("Unauthorized, allow need admin user!")
        }
    }

    asSuperAdmin(req: Request, res: Response, next: NextFunction) {
        const { role } = req.user as UserEntity;
        if (role === ROLE_TYPE.SUPER_ADMIN) {
            next();
        } else {
            throw createError.Unauthorized("Unauthorized, allow need super admin user!")
        }
    }
}

