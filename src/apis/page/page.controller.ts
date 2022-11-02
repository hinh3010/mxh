import { Request, Response } from "express";
import createError from 'http-errors';
import { HttpResponse } from "../../shared/http.response";
import catchAsync from "../../utils/catchAsync";
import checkEmpty from "../../utils/checkEmpty";
import { UserEntity } from "../user/user.entity";
import { PageEntity } from './page.entity';
import { CreatePagePayload, UpdatePagePayload } from "./page.interface";
import { PageService } from "./page.service";



export class PageController {

    constructor(
        private readonly service: PageService = new PageService(),
        private readonly httpResponse: HttpResponse = new HttpResponse(),
    ) { }


    getAll = catchAsync(async (req: Request, res: Response) => {
        const { page, limit, ...searchBy }: any = req.query

        const data = await this.service.findAll({ page, limit }, checkEmpty.removeFieldEmptyInObj(searchBy))
        return this.httpResponse.Ok(res, data)
    })


    create = catchAsync(async (req: Request, res: Response) => {

        const { id: createdById } = req.user as UserEntity
        const payload: CreatePagePayload = req.body

        payload.createdBy = createdById

        const data = await this.service.create(payload)
        return this.httpResponse.Ok(res, data)
    })

    getById = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;
        const data = await this.service.findById(id)
        if (!data)
            return this.httpResponse.NotFound(res, "Page not found")
        return this.httpResponse.Ok(res, data)
    })

    updateById = catchAsync(async (req: Request, res: Response) => {

        const { id } = req.params;
        const payload: UpdatePagePayload = req.body

        const isExist = await this.service.findById(id) as PageEntity
        if (!isExist) throw createError.NotFound('Page not found');

        const { id: createdById } = req.user as UserEntity
        if (isExist.createdById !== createdById)
            throw createError.Unauthorized("Permission denied")

        const isUpdated = await this.service.updateById(id, payload)
        if (!isUpdated)
            throw createError.InternalServerError('An unknown error occurred');

        const data = await this.service.findById(id)
        return this.httpResponse.Ok(res, data)
    })

    deleteById = catchAsync(async (req: Request, res: Response) => {

        const { id } = req.params;

        const isExist = await this.service.findById(id) as PageEntity
        if (!isExist) throw createError.NotFound('Page not found');

        const { id: createdById } = req.user as UserEntity
        if (isExist.createdById !== createdById)
            throw createError.Unauthorized("Permission denied")

        const isDeleted = await this.service.deleteById(id)
        if (!isDeleted)
            throw createError.InternalServerError('An unknown error occurred');

        return this.httpResponse.Ok(res, isExist)
    })

}