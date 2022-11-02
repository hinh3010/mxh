import bcrypt from "bcrypt";
import {
    IPaginationOptions, paginate,
    Pagination
} from 'nestjs-typeorm-paginate';
import { BaseService } from "../../shared/services/base.service";
import { Table } from "../../types/tableTypes";
import { UserEntity } from "./user.entity";
import { UpdateUserPayload } from "./user.interface";
import { Like } from "typeorm"

export class UserService extends BaseService<UserEntity> {
    constructor() {
        super(UserEntity);
    }

    // find
    async findById(id: string): Promise<UserEntity | null> {
        return (await this.execRepository).findOneBy({ id });
    }

    // async findAllUser(): Promise<{}> {
    //     // return (await this.execRepository).find();
    //     // return (await this.execRepository)
    //     //     .createQueryBuilder(Table.user)
    //     //     .leftJoinAndSelect("user.userInfoId", Table.userInfo)
    //     //     .getMany();

    //     const limit = 1

    //     const totalDocs = await (await this.execRepository).createQueryBuilder(Table.user).getCount()
    //     // const docs2: any = await (await this.execRepository).createQueryBuilder(Table.user).stream()
    //     // console.log(docs2.cursor?.text)

    //     const docs2: any = await (await this.execRepository).createQueryBuilder(Table.user)
    //     console.log({ docs2 })
    //     const docs = await (await this.execRepository)
    //         .createQueryBuilder(Table.user)
    //         .limit(limit)
    //         .orderBy("user.created_at", "DESC")
    //         .leftJoinAndSelect("user.userInfoId", Table.userInfo)
    //         .getMany();
    //     return {
    //         docs: docs,
    //         totalDocs: totalDocs,
    //         limit: limit
    //     }
    // }

    async findAllUser(options: IPaginationOptions, searchBy: any): Promise<Pagination<UserEntity>> {

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

        return paginate<UserEntity>(queryBuilder, options);
    }

    async findUserById(id: string): Promise<UserEntity | null> {
        return (await this.execRepository)
            .createQueryBuilder(Table.user)
            .leftJoinAndSelect("user.userInfoId", Table.userInfo)
            // .leftJoinAndSelect("user.posts", Table.post)
            .where({ id })
            .getOne();
    }

    async findUserByEmail(email: string): Promise<UserEntity | null> {
        return (await this.execRepository)
            .createQueryBuilder("user")
            .addSelect("user.password")
            .where({ email })
            .getOne();
    }

    async findUserByPhone(phone: string): Promise<UserEntity | null> {
        return (await this.execRepository)
            .createQueryBuilder("user")
            .addSelect("user.password")
            .where({ phone })
            .getOne();
    }

    async findUserByAccount(account: string, password: string): Promise<UserEntity | null> {
        const userByEmail = await this.findUserByEmail(account);
        const userByPhone = await this.findUserByPhone(account);

        if (userByPhone) {
            const isMatch = await bcrypt.compare(password, userByPhone.password);
            if (isMatch) {
                return userByPhone;
            }
        }
        if (userByEmail) {
            const isMatch = await bcrypt.compare(password, userByEmail.password);
            if (isMatch) {
                return userByEmail;
            }
        }

        return null;
    }


    // khac
    async updateUserById(id: string, infoUpdate: UpdateUserPayload): Promise<boolean> {
        const isUpdated = (await this.execRepository).update(id, infoUpdate)
        return Boolean((await isUpdated).affected)
    }









    async deleteUserById(id: string): Promise<boolean> {
        const isDeleted = (await this.execRepository).delete({ id })
        return Boolean((await isDeleted).affected)
    }

    async findUserWithRelation(id: string): Promise<UserEntity | null> {
        return (await this.execRepository)
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.customer", "customer")
            .where({ id })
            .getOne();
    }



    async findByUsername(name: string): Promise<UserEntity | null> {
        return (await this.execRepository)
            .createQueryBuilder("user")
            .addSelect("user.password")
            .where({ name })
            .getOne();
    }
}


