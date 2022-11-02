import {
    IPaginationOptions, paginate,
    Pagination
} from 'nestjs-typeorm-paginate';
import { BaseService } from "../../shared/services/base.service";
import { Table } from "../../types/tableTypes";
import { PostEntity } from "./post.entity";
import { UpdatePostPayload } from './post.interface';

export class PostService extends BaseService<PostEntity> {
    constructor() {
        super(PostEntity);
    }

    // create
    async createPost(payload: any): Promise<PostEntity> {
        return (await this.execRepository).save(payload)
    }

    // find
    // async findById(id: string): Promise<PostEntity | null> {
    //     return (await this.execRepository).findOne({
    //         where: { id }, relations: [
    //             "createdBy",
    //         ]
    //     });
    // }


    async findAllPost(options: IPaginationOptions, searchBy: any): Promise<Pagination<PostEntity>> {

        const queryBuilder = await (await this.execRepository)
            .createQueryBuilder(Table.post)
            .leftJoinAndSelect("post.createdBy", Table.user)
            // .leftJoinAndSelect("post.tags", Table.user)
            .where(searchBy)

        return paginate<PostEntity>(queryBuilder, options);
    }

    async findAllPostByTargetId(options: IPaginationOptions, searchBy: any): Promise<Pagination<PostEntity>> {

        const queryBuilder = await (await this.execRepository)
            .createQueryBuilder(Table.post)
            .leftJoinAndSelect("post.createdBy", Table.user)
            // .leftJoinAndSelect("post.tags", Table.user)
            .orderBy('post.createdAt', "DESC")
            .where(searchBy)

        return paginate<PostEntity>(queryBuilder, options);
    }


    async findPostById(id: string): Promise<PostEntity | null> {
        return (await this.execRepository)
            .createQueryBuilder(Table.post)
            .leftJoinAndSelect("post.createdBy", Table.user)
            // .leftJoinAndSelect("post.tags", Table.user)
            .where({ id })
            .getOne();
    }


    // khac
    async updatePostById(id: string, infoUpdate: UpdatePostPayload): Promise<boolean> {
        const isUpdated = (await this.execRepository).update(id, infoUpdate)
        return Boolean((await isUpdated).affected)
    }

    async deletePostById(id: string): Promise<boolean> {
        const isDeleted = (await this.execRepository).delete({ id })
        return Boolean((await isDeleted).affected)
    }


}


