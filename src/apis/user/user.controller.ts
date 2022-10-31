import { Request, Response } from "express";
import createError from 'http-errors';
import { HttpResponse } from "../../shared/http.response";
import catchAsync from "../../utils/catchAsync";
import checkEmpty from "../../utils/checkEmpty";
import { UserEntity } from './user.entity';
import { UpdateUserPayload } from "./user.interface";
import { UserService } from "./user.service";



export class UserController {

    constructor(
        private readonly userService: UserService = new UserService(),
        private readonly httpResponse: HttpResponse = new HttpResponse(),
    ) { }


    getUsers = catchAsync(async (req: Request, res: Response) => {
        const { page, limit, name, email, phone, gender, loginType, role, isActive }: any = req.query

        const searchBy = { name, email, phone, gender, loginType, role, isActive }

        const data = await this.userService.findAllUser({ page, limit }, checkEmpty.removeFieldEmptyInObj(searchBy))
        return this.httpResponse.Ok(res, data)
    })

    getUserById = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;
        const data = await this.userService.findUserById(id)
        if (!data)
            return this.httpResponse.NotFound(res, "User not found")
        return this.httpResponse.Ok(res, data)
    })

    updateUserById = catchAsync(async (req: Request, res: Response) => {

        const { id } = req.params;
        const senderId = req.user as UserEntity

        if (checkEmpty.obj(req.body)) throw createError.BadRequest()
        if (req.body.password) delete req.body.password
        const payload: UpdateUserPayload = req.body


        const isExist = await this.userService.findById(id)
        if (!isExist) throw createError.NotFound('User not found');

        const isUpdated = await this.userService.updateUserById(id, payload)
        if (!isUpdated)
            throw createError.InternalServerError('An unknown error occurred');

        const data = await this.userService.findUserById(id)
        return this.httpResponse.Ok(res, data)
    })

    deleteUserById = catchAsync(async (req: Request, res: Response) => {

        const { id } = req.params;
        const senderId = req.user as UserEntity

        const isExist = await this.userService.findById(id)
        if (!isExist) throw createError.NotFound('User not found');

        const isDeleted = await this.userService.deleteUserById(id)
        if (!isDeleted)
            throw createError.InternalServerError('An unknown error occurred');

        return this.httpResponse.Ok(res, isExist)
    })

}