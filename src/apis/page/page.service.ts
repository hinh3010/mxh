import {
    IPaginationOptions, paginate,
    Pagination
} from 'nestjs-typeorm-paginate';
import { Like } from 'typeorm';
import { BaseService } from "../../shared/services/base.service";
import { Table } from "../../types/tableTypes";
import { PageEntity } from "./page.entity";

export class PageService extends BaseService<PageEntity> {
    constructor() {
        super(PageEntity);
    }

    // create
    async create(payload: any): Promise<PageEntity> {
        return (await this.execRepository).save(payload)
    }

    async findAll(options: IPaginationOptions, searchBy: any): Promise<Pagination<PageEntity>> {

        let searchIncludes = []

        if (searchBy.name) {
            searchIncludes.push({ name: Like(`%${searchBy.name}%`) })
        }
        delete searchBy.name

        const queryBuilder = await (await this.execRepository)
            .createQueryBuilder(Table.page)
            .leftJoinAndSelect("page.createdBy", Table.user)
            .where(searchIncludes)
            .andWhere(searchBy)

        return paginate<PageEntity>(queryBuilder, options);
    }


    async findById(id: string): Promise<PageEntity | null> {
        return (await this.execRepository)
            .createQueryBuilder(Table.page)
            .leftJoinAndSelect("page.createdBy", Table.user)
            .where({ id })
            .getOne();
    }


    async updateById(id: string, infoUpdate: any): Promise<boolean> {
        const isUpdated = (await this.execRepository).update(id, infoUpdate)
        return Boolean((await isUpdated).affected)
    }


    async deleteById(id: string): Promise<boolean> {
        const isDeleted = (await this.execRepository).delete({ id })
        return Boolean((await isDeleted).affected)
    }


}


