import { Request, Response } from "express";
import createError from 'http-errors';
import { HttpResponse } from "../../shared/http.response";
import catchAsync from "../../utils/catchAsync";
import checkEmpty from "../../utils/checkEmpty";
import { PostEntity } from './post.entity';
import { PostService } from "./post.service";



export class PostController {

    constructor(
        private readonly userService: PostService = new PostService(),
        private readonly httpResponse: HttpResponse = new HttpResponse(),
    ) { }


    getPosts = catchAsync(async (req: Request, res: Response) => {
        const { page, limit, name, email, phone, gender, loginType, role, isActive }: any = req.query

        const searchBy = { name, email, phone, gender, loginType, role, isActive }

        const data = await this.userService.findAllPost({ page, limit }, checkEmpty.removeFieldEmptyInObj(searchBy))
        return this.httpResponse.Ok(res, data)
    })

    getPostsByTargetId = catchAsync(async (req: Request, res: Response) => {
        const { page, limit, name, email, phone, gender, loginType, role, isActive }: any = req.query

        const searchBy = { name, email, phone, gender, loginType, role, isActive }

        const data = await this.userService.findAllPost({ page, limit }, checkEmpty.removeFieldEmptyInObj(searchBy))
        return this.httpResponse.Ok(res, data)
    })

    createPost = catchAsync(async (req: Request, res: Response) => {

        console.log({ adu: req.user })
        const { page, limit, name, email, phone, gender, loginType, role, isActive }: any = req.query

        const searchBy = { name, email, phone, gender, loginType, role, isActive }

        const data = await this.userService.findAllPost({ page, limit }, checkEmpty.removeFieldEmptyInObj(searchBy))
        return this.httpResponse.Ok(res, data)
    })

    getPostById = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;
        const data = await this.userService.findPostById(id)
        if (!data)
            return this.httpResponse.NotFound(res, "Post not found")
        return this.httpResponse.Ok(res, data)
    })

    updatePostById = catchAsync(async (req: Request, res: Response) => {

        const { id } = req.params;
        const senderId = req.user as PostEntity

        if (checkEmpty.obj(req.body)) throw createError.BadRequest()
        if (req.body.password) delete req.body.password
        const payload: any = req.body


        const isExist = await this.userService.findById(id)
        if (!isExist) throw createError.NotFound('Post not found');

        const isUpdated = await this.userService.updatePostById(id, payload)
        if (!isUpdated)
            throw createError.InternalServerError('An unknown error occurred');

        const data = await this.userService.findPostById(id)
        return this.httpResponse.Ok(res, data)
    })

    deletePostById = catchAsync(async (req: Request, res: Response) => {

        const { id } = req.params;
        const senderId = req.user as PostEntity

        const isExist = await this.userService.findById(id)
        if (!isExist) throw createError.NotFound('Post not found');

        const isDeleted = await this.userService.deletePostById(id)
        if (!isDeleted)
            throw createError.InternalServerError('An unknown error occurred');

        return this.httpResponse.Ok(res, isExist)
    })

}