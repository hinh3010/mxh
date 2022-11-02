import { AfterLoad, Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../../shared/base.entity";
import { CMS_STATUS_TYPE, GROUP_VISIBLE_TYPE } from "../../types/enumTypes";
import { Table } from "../../types/tableTypes";
import { UserEntity } from "../user/user.entity";

@Entity({ name: Table.group })
export class GroupEntity extends BaseEntity {

    @Column()
    name!: string

    @Column({ default: null })
    description!: string

    @Column({ default: null })
    banner!: string

    @Column({ type: 'enum', enum: GROUP_VISIBLE_TYPE, default: GROUP_VISIBLE_TYPE.PUBLIC })
    groupVisible!: GROUP_VISIBLE_TYPE

    @Column({ type: 'enum', enum: CMS_STATUS_TYPE, default: CMS_STATUS_TYPE.ACTIVE })
    cmsStatus!: CMS_STATUS_TYPE

    // created by
    @ManyToOne(() => UserEntity, (user) => user.groups)
    @JoinColumn({ name: "user_id" })
    createdBy!: UserEntity

    createdById!: string | null

    @AfterLoad()
    setCreatedById() {
        this.createdById = this.createdBy?.id || null
    }
    //

    // @BeforeInsert()
    // @BeforeUpdate()
    // async setDates(): Promise<boolean> {
    //     const now: Date = Date.now()
    //     if (!this.createdAt) this.createdAt = now
    //     else this.updatedAt = now
    //     return true
    // }



}
