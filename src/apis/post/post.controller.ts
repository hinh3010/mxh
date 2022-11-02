import { Request, Response } from "express";
import createError from 'http-errors';
import { HttpResponse } from "../../shared/http.response";
import { POST_TARGET_EMTITY_TYPE } from "../../types/enumTypes";
import catchAsync from "../../utils/catchAsync";
import checkEmpty from "../../utils/checkEmpty";
import { GroupService } from "../group/group.service";
import { PageService } from "../page/page.service";
import { UserEntity } from "../user/user.entity";
import { UserService } from "../user/user.service";
import { CreatePostPayload, UpdatePostPayload } from "./post.interface";
import { PostService } from "./post.service";



export class PostController {

    constructor(
        private readonly userService: UserService = new UserService(),
        private readonly groupService: GroupService = new GroupService(),
        private readonly pageService: PageService = new PageService(),
        private readonly service: PostService = new PostService(),
        private readonly httpResponse: HttpResponse = new HttpResponse(),
    ) { }


    getPosts = catchAsync(async (req: Request, res: Response) => {
        const { page, limit, postVisible, cmsStatus, postType, targetEntity }: any = req.query

        const searchBy = { postVisible, cmsStatus, postType, targetEntity }

        const data = await this.service.findAllPost({ page, limit }, checkEmpty.removeFieldEmptyInObj(searchBy))
        return this.httpResponse.Ok(res, data)
    })

    getPostsByTargetId = catchAsync(async (req: Request, res: Response) => {
        const { page, limit }: any = req.query

        if (!req.body.targetEntity)
            req.body.targetEntity = POST_TARGET_EMTITY_TYPE.USER

        const searchBy = { ...req.body }

        const data = await this.service.findAllPostByTargetId({ page, limit }, checkEmpty.removeFieldEmptyInObj(searchBy))

        return this.httpResponse.Ok(res, data)
    })

    createPost = catchAsync(async (req: Request, res: Response) => {

        const { id: createdById } = req.user as UserEntity
        const payload: CreatePostPayload = req.body

        if (payload.targetEntity === POST_TARGET_EMTITY_TYPE.USER || !payload.targetEntity) {
            payload.targetEntity = POST_TARGET_EMTITY_TYPE.USER
            payload.targetById = createdById
        }
        payload.createdBy = createdById

        const data = await this.service.createPost(payload)
        return this.httpResponse.Ok(res, data)
    })

    getPostById = catchAsync(async (req: Request, res: Response) => {
        const { id } = req.params;
        const data = await this.service.findPostById(id)

        if (!data)
            return this.httpResponse.NotFound(res, "Post not found")

        let targetBy
        if (data?.targetById) {
            if (data.targetEntity === POST_TARGET_EMTITY_TYPE.USER)
                targetBy = await this.userService.findById(data?.targetById)
            else if (data.targetEntity === POST_TARGET_EMTITY_TYPE.PAGE)
                targetBy = await this.pageService.findById(data?.targetById)
            else if (data.targetEntity === POST_TARGET_EMTITY_TYPE.GROUP)
                targetBy = await this.groupService.findById(data?.targetById)
        }

        return this.httpResponse.Ok(res, {
            ...data, targetBy
        })
    })

    updatePostById = catchAsync(async (req: Request, res: Response) => {

        const { id } = req.params;
        const { id: createdById } = req.user as UserEntity

        // if (checkEmpty.obj(req.body)) throw createError.BadRequest()
        // if (req.body.targetEntity) delete req.body.targetEntity
        const payload: UpdatePostPayload = req.body

        const isExist = await this.service.findPostById(id)
        if (!isExist) throw createError.NotFound('Post not found');

        if (isExist.createdBy?.id !== createdById)
            throw createError.Unauthorized("Permission denied")

        const isUpdated = await this.service.updatePostById(id, payload)
        if (!isUpdated)
            throw createError.InternalServerError('An unknown error occurred');

        const data = await this.service.findPostById(id)
        return this.httpResponse.Ok(res, data)
    })

    deletePostById = catchAsync(async (req: Request, res: Response) => {

        const { id } = req.params;

        const isExist = await this.service.findPostById(id)
        if (!isExist) throw createError.NotFound('Post not found');

        const { id: createdById } = req.user as UserEntity
        if (isExist.createdBy?.id !== createdById)
            throw createError.Unauthorized("Permission denied")

        const isDeleted = await this.service.deletePostById(id)
        if (!isDeleted)
            throw createError.InternalServerError('An unknown error occurred');

        return this.httpResponse.Ok(res, isExist)
    })

}