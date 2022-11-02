import {
    IPaginationOptions, paginate,
    Pagination
} from 'nestjs-typeorm-paginate';
import { Like } from 'typeorm';
import { BaseService } from "../../shared/services/base.service";
import { Table } from "../../types/tableTypes";
import { GroupEntity } from './group.entity';

export class GroupService extends BaseService<GroupEntity> {
    constructor() {
        super(GroupEntity);
    }

    // create
    async create(payload: any): Promise<GroupEntity> {
        return (await this.execRepository).save(payload)
    }

    async findAll(options: IPaginationOptions, searchBy: any): Promise<Pagination<GroupEntity>> {

        let searchIncludes = []

        if (searchBy.name) {
            searchIncludes.push({ name: Like(`%${searchBy.name}%`) })
        }
        delete searchBy.name

        const queryBuilder = await (await this.execRepository)
            .createQueryBuilder(Table.group)
            .leftJoinAndSelect("group.createdBy", Table.user)
            .where(searchIncludes)
            .andWhere(searchBy)

        return paginate<GroupEntity>(queryBuilder, options);
    }


    async findById(id: string): Promise<GroupEntity | null> {
        return (await this.execRepository)
            .createQueryBuilder(Table.group)
            .leftJoinAndSelect("group.createdBy", Table.user)
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


