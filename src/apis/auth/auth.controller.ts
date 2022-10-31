import { Request, Response } from "express";
import { HttpResponse } from "../../shared/http.response";
import catchAsync from "../../utils/catchAsync";
import { RegisterPayload, SignTokenPayload } from "./auth.interface";
import { AuthService } from "./auth.service";
import * as bcrypt from "bcrypt";
import { UserEntity } from "../user/user.entity";
import jwtService from '../../shared/services/jwt.service';
import createError from 'http-errors';


export class AuthController {

    constructor(
        private readonly authService: AuthService = new AuthService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) { }


    login = catchAsync(async (req: Request, res: Response) => {

        const userEncode = req.user as UserEntity;

        const payload: SignTokenPayload = {
            id: userEncode.id,
            role: userEncode.role,
        }

        const token = await jwtService.signAccessToken(payload)
        const refreshToken = await jwtService.signRefreshToken(payload)

        const { password, ...restOfUser } = userEncode

        return this.httpResponse.Ok(res, {
            token,
            refreshToken,
            user: restOfUser,
        })
    })


    register = catchAsync(async (req: Request, res: Response) => {

        const payload: RegisterPayload = req.body

        if (!payload.displayName) {
            if (!payload.firstName) payload.displayName = payload.lastName
            else payload.displayName = payload.firstName + ' ' + payload.lastName
        }

        payload.password = await bcrypt.hash(payload.password, 10);

        const data = await this.authService.createUser(payload)

        return this.httpResponse.Ok(res, data)
    })


    refreshToken = catchAsync(async (req: Request, res: Response) => {
        const { refreshToken } = req.body

        if (!refreshToken) throw createError.BadRequest()

        const userEncode = await jwtService.verifyRefreshToken(refreshToken) as UserEntity

        if (userEncode.id) {

            const payload: SignTokenPayload = {
                id: userEncode.id,
                role: userEncode.role,
            }

            const token = await jwtService.signAccessToken(payload)
            const refreshToken = await jwtService.signRefreshToken(payload)
            const data = {
                token,
                refreshToken,
            }

            return this.httpResponse.Ok(res, data)
        }
        throw createError.BadRequest()
    })


}