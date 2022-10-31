import {
    IPaginationOptions, paginate,
    Pagination
} from 'nestjs-typeorm-paginate';
import { Like } from "typeorm";
import { BaseService } from "../../shared/services/base.service";
import { Table } from "../../types/tableTypes";
import { UserInfoEntity } from "./userInfo.entity";

export class UserInfoService extends BaseService<UserInfoEntity> {
    constructor() {
        super(UserInfoEntity);
    }

    // find
    async findById(id: string): Promise<UserInfoEntity | null> {
        return (await this.execRepository).findOneBy({ id });
    }


    async findAllUser(options: IPaginationOptions, searchBy: any): Promise<Pagination<UserInfoEntity>> {

        let searchIncludes = []

        if (searchBy.name) {
            searchIncludes.push({ firstName: Like(`%${searchBy.name}%`) })
            searchIncludes.push({ lastName: Like(`%${searchBy.name}%`) })
        }
        delete searchBy.name

        if (searchBy.email) {
            searchIncludes.push({ email: Like(`%${searchBy.email}%`) })
        }
        delete searchBy.email

        if (searchBy.phone) {
            searchIncludes.push({ phone: Like(`%${searchBy.phone}%`) })
        }
        delete searchBy.phone

        const queryBuilder = await (await this.execRepository)
            .createQueryBuilder(Table.user)
            // sort by 
            .orderBy('user.created_at', 'ASC')
            // search includes 
            .where(searchIncludes)
            // searct matches
            .andWhere(searchBy)

        return paginate<UserInfoEntity>(queryBuilder, options);
    }

    async findUserById(id: string): Promise<UserInfoEntity | null> {
        return (await this.execRepository)
            .createQueryBuilder(Table.user)
            .leftJoinAndSelect("user.userInfoId", Table.userInfo,)
            .where({ id })
            .getOne();
    }


    // khac
    async updateUserById(id: string, infoUpdate: any): Promise<boolean> {
        const isUpdated = (await this.execRepository).update(id, infoUpdate)
        return Boolean((await isUpdated).affected)
    }


    async deleteUserById(id: string): Promise<boolean> {
        const isDeleted = (await this.execRepository).delete({ id })
        return Boolean((await isDeleted).affected)
    }

}


