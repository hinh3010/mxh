import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "../../shared/base.entity";
import { Table } from "../../types/tableTypes";
import { UserEntity } from "../user/user.entity";

@Entity({ name: Table.userInfo })
export class UserInfoEntity extends BaseEntity {

    @Column({ default: null })
    friends!: string

    @Column({ default: null })
    followers!: string

    @Column({ default: null })
    followings!: string


    // quan he 1 - 1 vs table user 
    @OneToOne(() => UserEntity, (user) => user.id)
    @JoinColumn({ name: "user_id" })
    userId!: UserEntity;


    // @Column()
    // totalFriends!: number
    // @AfterInsert()
    // resetCounters() {
    //     this.totalFriends = this.friends?.length || 0
    // }

}