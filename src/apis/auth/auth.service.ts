import { BaseService } from "../../shared/services/base.service";
import { UserEntity } from "../user/user.entity";
import { RegisterPayload } from "./auth.interface";

export class AuthService extends BaseService<UserEntity> {
    constructor() {
        super(UserEntity);
    }

    async createUser(payload: RegisterPayload): Promise<UserEntity> {
        return (await this.execRepository).save(payload);
    }

    async findAllUser(): Promise<UserEntity[]> {
        return (await this.execRepository).find();
    }

}


