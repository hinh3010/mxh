import { Column, Entity, JoinColumn, ManyToOne, ObjectID, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "../../shared/base.entity";
import { CMS_STATUS_TYPE, POST_TARGET_EMTITY_TYPE, POST_TYPE, POST_VISIBLE_TYPE } from "../../types/enumTypes";
import { Table } from "../../types/tableTypes";
import { UserEntity } from "../user/user.entity";

@Entity({ name: Table.post })
export class PostEntity extends BaseEntity {

    @Column({ default: null })
    content!: string

    @Column("text", { array: true, default: [] })
    attachments!: string[]

    @Column("text", { array: true, default: [] })
    links!: string[]

    @Column()
    address!: string

    @Column({ type: 'enum', enum: POST_TYPE, default: POST_TYPE.NORMAL })
    postType!: POST_TYPE

    @Column({ type: 'enum', enum: POST_VISIBLE_TYPE, default: POST_VISIBLE_TYPE.PUBLIC })
    postVisible!: POST_VISIBLE_TYPE

    @Column({ type: 'enum', enum: CMS_STATUS_TYPE, default: CMS_STATUS_TYPE.ACTIVE })
    cmsStatus!: CMS_STATUS_TYPE

    @Column({ type: 'enum', enum: POST_TARGET_EMTITY_TYPE, default: POST_TARGET_EMTITY_TYPE.USER })
    targetEntity!: POST_TARGET_EMTITY_TYPE

    @Column()
    targetId!: string

    @OneToMany(() => UserEntity, (user) => user.id)
    @JoinColumn({ name: "user_id" })
    tags!: UserEntity[]

    @ManyToOne(() => UserEntity, (user) => user.posts)
    @JoinColumn({ name: "user_id" })
    createdById!: UserEntity

    // @OneToOne(() => UserEntity, (user) => user.id)
    // @JoinColumn({ name: "user_id" })
    updatedById!: UserEntity

    // @OneToOne(() => UserEntity, (user) => user.id)
    // @JoinColumn({ name: "user_id" })
    deletedById!: UserEntity

}
